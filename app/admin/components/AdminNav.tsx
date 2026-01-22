// ============================================
// ADMIN NAV COMPONENT - Signature Only
// ============================================

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AdminNav() {
    const pathname = usePathname();

    const navItems = [
        { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
        { href: '/admin/topics', label: 'Topics', icon: '📚' },
        { href: '/admin/questions', label: 'Questions', icon: '❓' },
        { href: '/admin/users', label: 'Users', icon: '👥' },
        { href: '/admin/interviews', label: 'Interviews', icon: '💼' },
        { href: '/admin/audit-logs', label: 'Audit Logs', icon: '📝' },
    ];

    return (
        <nav className="w-64 bg-white shadow-lg min-h-screen p-4">
            <div className="space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname?.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-blue-50 text-blue-600 font-semibold'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
