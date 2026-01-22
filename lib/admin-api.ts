// ============================================
// ADMIN API CLIENT - Production Implementation
// ============================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class AdminApiClient {
    private baseUrl: string;

    constructor(baseUrl: string = API_BASE_URL) {
        this.baseUrl = baseUrl;
    }

    private getToken(): string | null {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem('admin_token');
    }

    setToken(token: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('admin_token', token);
        }
    }

    clearToken() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('admin_token');
        }
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const token = this.getToken();
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({
                message: response.statusText,
            }));
            throw error;
        }

        return response.json();
    }

    // Auth
    async login(email: string, password: string) {
        return this.request<{ token: string; admin: any }>('/admin/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }

    async logout() {
        return this.request('/admin/auth/logout', { method: 'POST' });
    }

    async getMe() {
        return this.request<any>('/admin/auth/me');
    }

    // Topics
    async getTopics(params?: any) {
        const query = new URLSearchParams(params).toString();
        return this.request<any>(`/admin/topics?${query}`);
    }

    async getTopic(id: string) {
        return this.request<any>(`/admin/topics/${id}`);
    }

    async createTopic(data: any) {
        return this.request<any>('/admin/topics', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateTopic(id: string, data: any) {
        return this.request<any>(`/admin/topics/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async deleteTopic(id: string) {
        return this.request<any>(`/admin/topics/${id}`, { method: 'DELETE' });
    }

    async activateTopic(id: string) {
        return this.request<any>(`/admin/topics/${id}/activate`, { method: 'POST' });
    }

    async deactivateTopic(id: string) {
        return this.request<any>(`/admin/topics/${id}/deactivate`, { method: 'POST' });
    }

    // Questions
    async getQuestions(params?: any) {
        const query = new URLSearchParams(params).toString();
        return this.request<any>(`/admin/questions?${query}`);
    }

    async getQuestion(id: string) {
        return this.request<any>(`/admin/questions/${id}`);
    }

    async createQuestion(data: any) {
        return this.request<any>('/admin/questions', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateQuestion(id: string, data: any) {
        return this.request<any>(`/admin/questions/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async deleteQuestion(id: string) {
        return this.request<any>(`/admin/questions/${id}`, { method: 'DELETE' });
    }

    async publishQuestion(id: string) {
        return this.request<any>(`/admin/questions/${id}/publish`, { method: 'POST' });
    }

    async archiveQuestion(id: string) {
        return this.request<any>(`/admin/questions/${id}/archive`, { method: 'POST' });
    }

    async duplicateQuestion(id: string) {
        return this.request<any>(`/admin/questions/${id}/duplicate`, { method: 'POST' });
    }

    // Hints
    async getHints(questionId: string) {
        return this.request<any>(`/admin/questions/${questionId}/hints`);
    }

    async createHint(questionId: string, data: any) {
        return this.request<any>(`/admin/questions/${questionId}/hints`, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async updateHint(id: string, data: any) {
        return this.request<any>(`/admin/hints/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async deleteHint(id: string) {
        return this.request<any>(`/admin/hints/${id}`, { method: 'DELETE' });
    }
}

export const adminApi = new AdminApiClient();
