// ============================================
// QUESTION FILTERS COMPONENT - Signature Only
// ============================================

'use client';

interface QuestionFiltersProps {
    filters: {
        topicId?: string;
        difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
        status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
        search?: string;
    };
    onChange: (filters: any) => void;
}

export function QuestionFilters({ filters, onChange }: QuestionFiltersProps) {
    return (
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search questions..."
                    value={filters.search || ''}
                    onChange={(e) => onChange({ ...filters, search: e.target.value })}
                    className="px-4 py-2 bg-slate-800 border-slate-700 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Topic Filter */}
                <select
                    value={filters.topicId || ''}
                    onChange={(e) => onChange({ ...filters, topicId: e.target.value || undefined })}
                    className="px-4 py-2 bg-slate-800 border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Topics</option>
                    {/* TODO: Load topics dynamically */}
                </select>

                {/* Difficulty Filter */}
                <select
                    value={filters.difficulty || ''}
                    onChange={(e) => onChange({ ...filters, difficulty: e.target.value || undefined })}
                    className="px-4 py-2 bg-slate-800 border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Difficulties</option>
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                </select>

                {/* Status Filter */}
                <select
                    value={filters.status || ''}
                    onChange={(e) => onChange({ ...filters, status: e.target.value || undefined })}
                    className="px-4 py-2 bg-slate-800 border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Status</option>
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                </select>
            </div>
        </div>
    );
}
