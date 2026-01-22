// ============================================
// TOPIC CARD COMPONENT - Signature Only
// ============================================

'use client';

interface TopicCardProps {
    topic: any;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onToggleActive: (id: string) => void;
}

export function TopicCard({ topic, onEdit, onDelete, onToggleActive }: TopicCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold">{topic.name || 'Topic Name'}</h3>
                <span className={`px-2 py-1 text-xs rounded ${topic.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                    {topic.isActive ? 'Active' : 'Inactive'}
                </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">{topic.description || 'No description'}</p>

            <div className="flex items-center justify-between">
                <span className={`px-2 py-1 text-xs rounded ${topic.difficulty === 'EASY' ? 'bg-green-100 text-green-800' :
                        topic.difficulty === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                    }`}>
                    {topic.difficulty || 'MEDIUM'}
                </span>

                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit(topic.id)}
                        className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onToggleActive(topic.id)}
                        className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded"
                    >
                        {topic.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                        onClick={() => onDelete(topic.id)}
                        className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
