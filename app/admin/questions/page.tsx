// ============================================
// ADMIN QUESTIONS LIST PAGE - Signature Only
// ============================================

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionFilters } from '../components/QuestionFilters';
import { QuestionCard } from '../components/QuestionCard';

export default function AdminQuestionsPage() {
    const router = useRouter();
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        topicId: undefined,
        difficulty: undefined,
        status: undefined,
        search: '',
    });

    useEffect(() => {
        loadQuestions();
    }, [filters]);

    const loadQuestions = async () => {
        try {
            setLoading(true);
            const { adminApi } = await import('../../../lib/admin-api');

            // Build query params from filters
            const params: any = {};
            if (filters.topicId) params.topicId = filters.topicId;
            if (filters.difficulty) params.difficulty = filters.difficulty;
            if (filters.status) params.status = filters.status;
            if (filters.search) params.search = filters.search;

            const response = await adminApi.getQuestions(params);
            setQuestions(response.data || []);
        } catch (error) {
            console.error('Failed to load questions:', error);
            setQuestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateQuestion = () => {
        router.push('/admin/questions/create');
    };

    const handleEditQuestion = (id: string) => {
        router.push(`/admin/questions/${id}/edit`);
    };

    const handleDeleteQuestion = async (id: string) => {
        // TODO: Implement delete
        // DELETE /api/admin/questions/:id
        console.log('Delete question not implemented');
    };

    const handlePublishQuestion = async (id: string) => {
        // TODO: Implement publish
        // POST /api/admin/questions/:id/publish
        console.log('Publish question not implemented');
    };

    const handleArchiveQuestion = async (id: string) => {
        // TODO: Implement archive
        // POST /api/admin/questions/:id/archive
        console.log('Archive question not implemented');
    };

    const handleDuplicateQuestion = async (id: string) => {
        // TODO: Implement duplicate
        // POST /api/admin/questions/:id/duplicate
        console.log('Duplicate question not implemented');
    };

    if (loading) {
        return <div>Loading questions...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Questions</h1>
                <button
                    onClick={handleCreateQuestion}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Create Question
                </button>
            </div>

            <QuestionFilters filters={filters} onChange={setFilters} />

            <div className="space-y-4">
                {questions.length === 0 ? (
                    <p className="text-gray-500">No questions found</p>
                ) : (
                    questions.map((question) => (
                        <QuestionCard
                            key={question.id}
                            question={question}
                            onEdit={handleEditQuestion}
                            onDelete={handleDeleteQuestion}
                            onPublish={handlePublishQuestion}
                            onArchive={handleArchiveQuestion}
                            onDuplicate={handleDuplicateQuestion}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
