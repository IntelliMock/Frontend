// ============================================
// QUESTION CARD COMPONENT - Modern Premium Design
// ============================================

'use client';

interface QuestionCardProps {
    question: any;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onPublish: (id: string) => void;
    onArchive: (id: string) => void;
    onDuplicate: (id: string) => void;
}

export function QuestionCard({
    question,
    onEdit,
    onDelete,
    onPublish,
    onArchive,
    onDuplicate,
}: QuestionCardProps) {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'DRAFT':
                return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
            case 'PUBLISHED':
                return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white';
            case 'ARCHIVED':
                return 'bg-gradient-to-r from-red-500 to-rose-600 text-white';
            default:
                return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white';
        }
    };

    const getDifficultyBadge = (difficulty: string) => {
        switch (difficulty) {
            case 'EASY':
                return 'bg-gradient-to-r from-green-400 to-green-500 text-white';
            case 'MEDIUM':
                return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
            case 'HARD':
                return 'bg-gradient-to-r from-red-500 to-pink-600 text-white';
            default:
                return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
        }
    };

    return (
        <div className="group relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10">
                {/* Header with badges */}
                <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 pr-4">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {question.title || 'Question Title'}
                        </h3>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${getStatusBadge(question.status)}`}>
                                {question.status || 'DRAFT'}
                            </span>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${getDifficultyBadge(question.difficulty)}`}>
                                {question.difficulty || 'MEDIUM'}
                            </span>
                            <span className="px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 bg-white/50 dark:bg-slate-700/50 rounded-full">
                                v{question.version || 1}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Description with 2-line truncation */}
                <p
                    className="text-sm text-slate-700 dark:text-slate-300 mb-4 overflow-hidden"
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: '1.5rem',
                        maxHeight: '3rem'
                    }}
                >
                    {question.problemStatement || 'No description available'}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {question.hintCount || 0} hints
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {question.testCaseCount || 0} tests
                        </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => onEdit(question.id)}
                            className="px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        >
                            Edit
                        </button>
                        {question.status === 'DRAFT' && (
                            <button
                                onClick={() => onPublish(question.id)}
                                className="px-3 py-1.5 text-xs font-medium text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                            >
                                Publish
                            </button>
                        )}
                        {question.status === 'PUBLISHED' && (
                            <button
                                onClick={() => onArchive(question.id)}
                                className="px-3 py-1.5 text-xs font-medium text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-lg transition-colors"
                            >
                                Archive
                            </button>
                        )}
                        <button
                            onClick={() => onDuplicate(question.id)}
                            className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                            Duplicate
                        </button>
                        <button
                            onClick={() => onDelete(question.id)}
                            className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
