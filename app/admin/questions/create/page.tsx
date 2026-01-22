// ============================================
// CREATE QUESTION PAGE - Signature Only
// ============================================

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '../../../../lib/admin-api';
import { QuestionForm } from '../../components/QuestionForm';
import { useToast } from '@/hooks/use-toast';

export default function CreateQuestionPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [draftData, setDraftData] = useState<any>(null);
    const [draftLoaded, setDraftLoaded] = useState(false);

    const DRAFT_KEY = 'admin_question_draft';

    // Load draft on component mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedDraft = localStorage.getItem(DRAFT_KEY);
            if (savedDraft) {
                try {
                    const draft = JSON.parse(savedDraft);
                    const savedDate = new Date(draft.savedAt).toLocaleString();
                    const shouldLoad = confirm(
                        `A draft was saved on ${savedDate}. Do you want to restore it?`
                    );

                    if (shouldLoad) {
                        setDraftData(draft);
                    } else {
                        localStorage.removeItem(DRAFT_KEY);
                    }
                } catch (error) {
                    console.error('Failed to load draft:', error);
                    localStorage.removeItem(DRAFT_KEY);
                }
            }
        }
        setDraftLoaded(true);
    }, []);

    const handleSubmit = async (data: any) => {
        try {
            setLoading(true);
            await adminApi.createQuestion(data);

            // Clear draft after successful creation
            if (typeof window !== 'undefined') {
                localStorage.removeItem(DRAFT_KEY);
            }

            toast({
                title: 'Success',
                description: 'Question created successfully!',
            });
            router.push('/admin/questions');
            router.refresh(); // Ensure the list updates
        } catch (error: any) {
            console.error('Failed to create question:', error);
            console.error('Error details:', {
                message: error?.message,
                status: error?.status,
                statusCode: error?.statusCode,
                fullError: JSON.stringify(error, null, 2)
            });
            toast({
                title: 'Error',
                description: error?.message || 'Failed to create question',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        const shouldClearDraft = confirm('Do you want to discard the draft?');
        if (shouldClearDraft && typeof window !== 'undefined') {
            localStorage.removeItem(DRAFT_KEY);
        }
        router.push('/admin/questions');
    };

    const handleSaveDraft = async (data: any) => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.setItem(DRAFT_KEY, JSON.stringify({
                    ...data,
                    savedAt: new Date().toISOString()
                }));
                toast({
                    title: 'Success',
                    description: 'Draft saved successfully!',
                });
            }
        } catch (error) {
            console.error('Failed to save draft:', error);
            toast({
                title: 'Error',
                description: 'Failed to save draft. Please try again.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Create Question</h1>

            <div className="bg-white p-6 rounded-lg shadow">
                {draftLoaded && (
                    <QuestionForm
                        mode="create"
                        initialData={draftData}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        onSaveDraft={handleSaveDraft}
                        loading={loading}
                    />
                )}
            </div>
        </div>
    );
}
