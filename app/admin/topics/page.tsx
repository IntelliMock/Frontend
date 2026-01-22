// ============================================
// ADMIN TOPICS PAGE - Production Implementation
// ============================================

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi } from '@/lib/admin-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Plus, Search, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminTopicsPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [topics, setTopics] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [difficulty, setDifficulty] = useState('all');
    const [deleteId, setDeleteId] = useState<string | null>(null);

    useEffect(() => {
        loadTopics();
    }, [search, difficulty]);

    const loadTopics = async () => {
        try {
            setLoading(true);
            const params: any = { page: 1, pageSize: 50 };
            if (search) params.search = search;
            if (difficulty && difficulty !== 'all') params.difficulty = difficulty;

            const response = await adminApi.getTopics(params);
            setTopics(response.data || []);
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to load topics',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteId) return;

        try {
            await adminApi.deleteTopic(deleteId);
            toast({
                title: 'Success',
                description: 'Topic deactivated successfully',
            });
            loadTopics();
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to delete topic',
                variant: 'destructive',
            });
        } finally {
            setDeleteId(null);
        }
    };

    const handleToggleActive = async (id: string, isActive: boolean) => {
        try {
            if (isActive) {
                await adminApi.deactivateTopic(id);
            } else {
                await adminApi.activateTopic(id);
            }
            toast({
                title: 'Success',
                description: `Topic ${isActive ? 'deactivated' : 'activated'} successfully`,
            });
            loadTopics();
        } catch (error: any) {
            toast({
                title: 'Error',
                description: error.message || 'Failed to update topic',
                variant: 'destructive',
            });
        }
    };

    const getDifficultyColor = (diff: string) => {
        switch (diff) {
            case 'EASY':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'MEDIUM':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'HARD':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return '';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Topics</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage interview topics and categories
                    </p>
                </div>
                <Button onClick={() => router.push('/admin/topics/create')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Topic
                </Button>
            </div>

            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search topics..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="w-40">
                        <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="EASY">Easy</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HARD">Hard</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Difficulty</TableHead>
                                <TableHead>Questions</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {topics.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        No topics found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                topics.map((topic) => (
                                    <TableRow key={topic.id}>
                                        <TableCell className="font-medium">{topic.name}</TableCell>
                                        <TableCell className="max-w-md truncate">{topic.description}</TableCell>
                                        <TableCell>
                                            <Badge className={getDifficultyColor(topic.difficulty)}>
                                                {topic.difficulty}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{topic._count?.questions || 0}</TableCell>
                                        <TableCell>
                                            {topic.isActive ? (
                                                <Badge variant="outline" className="text-green-600">
                                                    Active
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-gray-600">
                                                    Inactive
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => router.push(`/admin/topics/${topic.id}/edit`)}
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleToggleActive(topic.id, topic.isActive)}
                                                >
                                                    {topic.isActive ? (
                                                        <XCircle className="w-4 h-4 text-orange-500" />
                                                    ) : (
                                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setDeleteId(topic.id)}
                                                >
                                                    <Trash2 className="w-4 h-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}

            <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will deactivate the topic. You can reactivate it later.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
