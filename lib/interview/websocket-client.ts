import { io, Socket } from 'socket.io-client';
import { WSMessage, WSMessageType } from '@/types/interview';

/**
 * WebSocket Client Singleton
 * Manages persistent connection to interview server
 */
class WebSocketClient {
    private socket: Socket | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private listeners: Map<string, Set<(data: unknown) => void>> = new Map();

    /**
     * Initialize WebSocket connection
     */
    connect(sessionId: string, token: string): void {
        if (this.socket?.connected) {
            console.warn('WebSocket already connected');
            return;
        }

        const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001';

        this.socket = io(wsUrl, {
            auth: { token, sessionId },
            transports: ['websocket'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            reconnectionAttempts: this.maxReconnectAttempts,
        });

        this.setupEventHandlers();
    }

    /**
     * Set up core WebSocket event handlers
     */
    private setupEventHandlers(): void {
        if (!this.socket) return;

        this.socket.on('connect', () => {
            console.log('✅ WebSocket connected');
            this.reconnectAttempts = 0;
            this.emit('connection:status', { connected: true });
        });

        this.socket.on('disconnect', (reason) => {
            console.warn('⚠️ WebSocket disconnected:', reason);
            this.emit('connection:status', { connected: false, reason });
        });

        this.socket.on('connect_error', (error) => {
            console.error('❌ WebSocket connection error:', error);
            this.reconnectAttempts++;

            if (this.reconnectAttempts >= this.maxReconnectAttempts) {
                this.emit('connection:failed', { error: 'Max reconnection attempts reached' });
            }
        });

        this.socket.on('reconnect', (attemptNumber) => {
            console.log(`🔄 WebSocket reconnected after ${attemptNumber} attempts`);
            this.emit('connection:reconnected', { attemptNumber });
        });

        // Listen to all server events and route to subscribers
        this.socket.onAny((eventName: string, data: unknown) => {
            this.emit(eventName, data);
        });
    }

    /**
     * Send message to server
     */
    send<T>(type: WSMessageType, payload: T): void {
        if (!this.socket?.connected) {
            console.error('Cannot send message: WebSocket not connected');
            return;
        }

        const message: WSMessage = { type, payload };
        this.socket.emit(type, payload);
    }

    /**
     * Subscribe to specific event
     */
    on<T>(event: string, callback: (data: T) => void): () => void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }

        this.listeners.get(event)!.add(callback as (data: unknown) => void);

        // Return unsubscribe function
        return () => {
            const eventListeners = this.listeners.get(event);
            if (eventListeners) {
                eventListeners.delete(callback as (data: unknown) => void);
            }
        };
    }

    /**
     * Emit event to all subscribers
     */
    private emit(event: string, data: unknown): void {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
            eventListeners.forEach((callback) => callback(data));
        }
    }

    /**
     * Disconnect WebSocket
     */
    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.listeners.clear();
            this.reconnectAttempts = 0;
        }
    }

    /**
     * Check connection status
     */
    isConnected(): boolean {
        return this.socket?.connected ?? false;
    }
}

// Export singleton instance
export const wsClient = new WebSocketClient();
