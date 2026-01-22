// ============================================
// ADMIN HEADER COMPONENT - Signature Only
// ============================================

'use client';

import { useState } from 'react';

export function AdminHeader() {
    const [admin, setAdmin] = useState<any>(null);

    const handleLogout = async () => {
        // TODO: Implement logout
        // POST /api/admin/auth/logout
        console.log('Logout not implemented');
    };

    return (
        <header className="bg-white shadow-sm border-b">
            <div className="flex items-center justify-between px-8 py-4">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold text-blue-600">IntelliMock Admin</h1>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="text-sm font-medium">Admin User</p>
                        <p className="text-xs text-gray-500">SuperAdmin</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}
