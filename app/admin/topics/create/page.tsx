// ============================================
// CREATE/EDIT TOPIC PAGE - Production Implementation
// ============================================

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { adminApi } from '@/lib/admin-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft } from 'lucide-react';

const topicSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters').max(100),
    description: z.string().min(10, 'Description must be at least 10 characters').max(500),
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
    isActive: z.boolean(),
});

type TopicFormData = z.infer<typeof topicSchema>;

export default function CreateEditTopicPage() {
    const router = useRouter();
    const params = useParams();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(false);
    const isEdit = !!params?.id;

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<TopicFormData>({
        resolver: zodResolver(topicSchema),
        defaultValues: {
            isActive: true,
            difficulty: 'EASY',
        },
    });

    useEffect(() => {
        if (isEdit && params.id) {
            loadTopic(params.id as string);
        }
    }, [isEdit, params.id]);

    const loadTopic = async (id: string) => {
        try {
            setInitialLoading(true);
            const topic = await adminApi.getTopic(id);
            setValue('name', topic.name);
            setValue('description', topic.description);
            setValue('difficulty', topic.difficulty);
            setValue('isActive', topic.isActive);
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to load topic',
                variant: 'destructive',
            });
            router.push('/admin/topics');
        } finally {
            setInitialLoading(false);
        }
    };

    const onSubmit = async (data: TopicFormData) => {
        try {
            setLoading(true);

            if (isEdit && params.id) {
                await adminApi.updateTopic(params.id as string, data);
                toast({
                    title: 'Success',
                    description: 'Topic updated successfully',
                });
            } else {
                await adminApi.createTopic(data);
                toast({
                    title: 'Success',
                    description: 'Topic created successfully',
                });
            }

            router.push('/admin/topics');
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || `Failed to ${isEdit ? 'update' : 'create'} topic`,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-2xl">
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push('/admin/topics')}
                >
                    <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">
                        {isEdit ? 'Edit Topic' : 'Create Topic'}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {isEdit ? 'Update topic details' : 'Add a new interview topic'}
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Topic Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name *</Label>
                            <Input
                                id="name"
                                placeholder="e.g., Arrays and Strings"
                                {...register('name')}
                                disabled={loading}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe the topic..."
                                rows={4}
                                {...register('description')}
                                disabled={loading}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="difficulty">Difficulty *</Label>
                            <Select
                                value={watch('difficulty')}
                                onValueChange={(value) => setValue('difficulty', value as any)}
                                disabled={loading}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="EASY">Easy</SelectItem>
                                    <SelectItem value="MEDIUM">Medium</SelectItem>
                                    <SelectItem value="HARD">Hard</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.difficulty && (
                                <p className="text-sm text-red-500">{errors.difficulty.message}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isActive"
                                {...register('isActive')}
                                disabled={loading}
                                className="w-4 h-4"
                            />
                            <Label htmlFor="isActive" className="cursor-pointer">
                                Active (visible to users)
                            </Label>
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Saving...' : isEdit ? 'Update Topic' : 'Create Topic'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push('/admin/topics')}
                                disabled={loading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
