// ============================================
// TOPIC FILTERS COMPONENT - Signature Only
// ============================================

'use client';

interface TopicFiltersProps {
    filters: {
        difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
        isActive?: boolean;
        search?: string;
    };
    onChange: (filters: any) => void;
}

export function TopicFilters({ filters, onChange }: TopicFiltersProps) {
    return (
        <div className="bg-white p-4 rounded-lg shadow space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search topics..."
                    value={filters.search || ''}
                    onChange={(e) => onChange({ ...filters, search: e.target.value })}
                    className="px-4 py-2 border rounded-lg"
                />

                {/* Difficulty Filter */}
                <select
                    value={filters.difficulty || ''}
                    onChange={(e) => onChange({ ...filters, difficulty: e.target.value || undefined })}
                    className="px-4 py-2 border rounded-lg"
                >
                    <option value="">All Difficulties</option>
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                </select>

                {/* Active Filter */}
                <select
                    value={filters.isActive === undefined ? '' : filters.isActive.toString()}
                    onChange={(e) => {
                        const value = e.target.value === '' ? undefined : e.target.value === 'true';
                        onChange({ ...filters, isActive: value });
                    }}
                    className="px-4 py-2 border rounded-lg"
                >
                    <option value="">All Status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
            </div>
        </div>
    );
}
