// ============================================
// QUESTION FORM COMPONENT - Production Implementation
// ============================================

'use client';

import { useState, useEffect } from 'react';
import { adminApi } from '../../../lib/admin-api';

interface QuestionFormProps {
    mode: 'create' | 'edit';
    initialData?: any;
    onSubmit: (data: any) => Promise<void>;
    onCancel: () => void;
    onSaveDraft?: (data: any) => void;
    loading?: boolean;
}

export function QuestionForm({
    mode,
    initialData,
    onSubmit,
    onCancel,
    onSaveDraft,
    loading,
}: QuestionFormProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [maxStepReached, setMaxStepReached] = useState(1); // Track furthest step reached
    const [formData, setFormData] = useState({
        topicId: initialData?.topicId || '',
        title: initialData?.title || '',
        problemStatement: initialData?.problemStatement || '',
        inputFormat: initialData?.inputFormat || '',
        outputFormat: initialData?.outputFormat || '',
        constraints: initialData?.constraints || '',
        sampleInput: initialData?.sampleInput || '',
        sampleOutput: initialData?.sampleOutput || '',
        explanation: initialData?.explanation || '',
        tags: initialData?.tags ? initialData.tags.join(', ') : '',
        difficulty: initialData?.difficulty || 'MEDIUM',
    });

    const steps = [
        'Basic Info',
        'Problem Statement',
        'I/O Format',
        'Sample I/O',
        'Review',
    ];

    const handleNext = () => {
        // TODO: Validate current step
        if (currentStep < steps.length) {
            const nextStep = currentStep + 1;
            setCurrentStep(nextStep);
            setMaxStepReached(Math.max(maxStepReached, nextStep));
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleStepClick = (stepNumber: number) => {
        // Only allow navigation to current step or previous completed steps
        if (stepNumber <= maxStepReached) {
            setCurrentStep(stepNumber);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prepare payload (convert tags string to array)
        const payload = {
            ...formData,
            tags: formData.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t),
        };

        await onSubmit(payload);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <BasicInfoStep formData={formData} setFormData={setFormData} />;
            case 2:
                return <ProblemStatementStep formData={formData} setFormData={setFormData} />;
            case 3:
                return <IOFormatStep formData={formData} setFormData={setFormData} />;
            case 4:
                return <SampleIOStep formData={formData} setFormData={setFormData} />;
            case 5:
                return <ReviewStep formData={formData} />;
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Modern Step Indicator */}
            <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-700 -translate-y-1/2 rounded-full" />
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 -translate-y-1/2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                />

                <div className="relative flex justify-between">
                    {steps.map((step, index) => {
                        const stepNumber = index + 1;
                        const isCompleted = stepNumber < currentStep;
                        const isCurrent = stepNumber === currentStep;
                        const isAccessible = stepNumber <= maxStepReached;

                        return (
                            <div key={index} className="flex flex-col items-center">
                                <button
                                    type="button"
                                    onClick={() => handleStepClick(stepNumber)}
                                    disabled={!isAccessible}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 ${isCompleted
                                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 cursor-pointer'
                                        : isCurrent
                                            ? 'bg-gradient-to-br from-slate-700 to-slate-800 border-blue-500 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)] ring-4 ring-blue-500/20 cursor-default'
                                            : isAccessible
                                                ? 'bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 text-slate-400 hover:border-blue-500/50 hover:text-blue-400 cursor-pointer'
                                                : 'bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 text-slate-600 cursor-not-allowed opacity-50'
                                        }`}
                                >
                                    {isCompleted ? (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        <span className="text-sm font-bold">{stepNumber}</span>
                                    )}
                                </button>
                                <span
                                    className={`mt-2 text-xs font-medium transition-colors duration-300 ${isCurrent ? 'text-blue-400 font-semibold' : isAccessible ? 'text-slate-400' : 'text-slate-600'
                                        } ${isAccessible ? 'cursor-pointer hover:text-blue-400' : 'cursor-not-allowed'}`}
                                    onClick={() => isAccessible && handleStepClick(stepNumber)}
                                >
                                    {step}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Step Content */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-8 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-xl min-h-[400px]">
                {renderStep()}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
                <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="px-6 py-2.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors flex items-center gap-2 font-medium"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>

                <div className="flex space-x-4">
                    {onSaveDraft && (
                        <button
                            type="button"
                            onClick={() => onSaveDraft({ ...formData, tags: formData.tags.split(',').map((t: string) => t.trim()).filter((t: string) => t) })}
                            className="px-6 py-2.5 text-slate-200 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 rounded-xl transition-all font-medium border border-slate-600 hover:border-slate-500 shadow-lg"
                        >
                            Save Draft
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2.5 text-slate-300 hover:text-white transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    {currentStep < steps.length ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="px-8 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 flex items-center gap-2"
                        >
                            Next Step
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="px-8 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-0.5 flex items-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    {mode === 'create' ? 'Create Question' : 'Update Question'}
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
}

// Step Components
function BasicInfoStep({ formData, setFormData }: any) {
    const [topics, setTopics] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadTopics = async () => {
            try {
                const response = await adminApi.getTopics();
                setTopics(response.data || []);
            } catch (error) {
                console.error('Failed to load topics:', error);
            } finally {
                setLoading(false);
            }
        };
        loadTopics();
    }, []);

    const handleChange = (field: string, value: any) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Topic</label>
                <div className="relative">
                    <select
                        value={formData.topicId}
                        onChange={(e) => handleChange('topicId', e.target.value)}
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none"
                        required
                    >
                        <option value="" className="bg-slate-900">Select a topic</option>
                        {topics.map((topic) => (
                            <option key={topic.id} value={topic.id} className="bg-slate-900">
                                {topic.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
                {loading && <p className="text-xs text-slate-500 mt-1 ml-1">Loading topics...</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Question Title</label>
                <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="e.g. Two Sum"
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    required
                />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Difficulty</label>
                    <div className="relative">
                        <select
                            value={formData.difficulty}
                            onChange={(e) => handleChange('difficulty', e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none"
                        >
                            <option value="EASY" className="bg-slate-900">Easy</option>
                            <option value="MEDIUM" className="bg-slate-900">Medium</option>
                            <option value="HARD" className="bg-slate-900">Hard</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Tags</label>
                    <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => handleChange('tags', e.target.value)}
                        placeholder="e.g. array, dp"
                        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    />
                </div>
            </div>
        </div>
    );
}

function ProblemStatementStep({ formData, setFormData }: any) {
    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Problem Statement (Markdown supported)</label>
            <textarea
                value={formData.problemStatement}
                onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                className="w-full h-80 px-4 py-3 bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
                placeholder="Describe the problem here..."
                required
            />
        </div>
    );
}

function IOFormatStep({ formData, setFormData }: any) {
    return (
        <div className="space-y-8">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Input Format</label>
                <textarea
                    value={formData.inputFormat}
                    onChange={(e) => setFormData({ ...formData, inputFormat: e.target.value })}
                    className="w-full h-32 px-4 py-3 bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-sm"
                    placeholder="Describe the input format..."
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Output Format</label>
                <textarea
                    value={formData.outputFormat}
                    onChange={(e) => setFormData({ ...formData, outputFormat: e.target.value })}
                    className="w-full h-32 px-4 py-3 bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-sm"
                    placeholder="Describe the output format..."
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Constraints</label>
                <textarea
                    value={formData.constraints}
                    onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                    className="w-full h-32 px-4 py-3 bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-sm"
                    placeholder="List the constraints (e.g. 1 <= N <= 10^5)..."
                    required
                />
            </div>
        </div>
    );
}

function SampleIOStep({ formData, setFormData }: any) {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Sample Input</label>
                    <textarea
                        value={formData.sampleInput}
                        onChange={(e) => setFormData({ ...formData, sampleInput: e.target.value })}
                        className="w-full h-64 px-4 py-3 bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-sm"
                        placeholder="Provide sample input..."
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Sample Output</label>
                    <textarea
                        value={formData.sampleOutput}
                        onChange={(e) => setFormData({ ...formData, sampleOutput: e.target.value })}
                        className="w-full h-64 px-4 py-3 bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-sm"
                        placeholder="Provide sample output..."
                        required
                    />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2 ml-1">Explanation</label>
                <textarea
                    value={formData.explanation}
                    onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
                    className="w-full h-32 px-4 py-3 bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-mono text-sm"
                    placeholder="Explain the sample case..."
                />
            </div>
        </div>
    );
}

function ReviewStep({ formData }: any) {
    return (
        <div className="space-y-6 text-slate-300">
            <h3 className="text-xl font-semibold text-white">Review Question Details</h3>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                    <span className="block text-sm font-medium text-slate-500">Title</span>
                    <span className="text-lg text-white">{formData.title}</span>
                </div>
                <div>
                    <span className="block text-sm font-medium text-slate-500">Topic ID</span>
                    <span>{formData.topicId}</span>
                </div>
                <div>
                    <span className="block text-sm font-medium text-slate-500">Difficulty</span>
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${formData.difficulty === 'EASY' ? 'bg-green-900 text-green-300' :
                        formData.difficulty === 'MEDIUM' ? 'bg-yellow-900 text-yellow-300' :
                            'bg-red-900 text-red-300'
                        }`}>
                        {formData.difficulty}
                    </span>
                </div>
                <div>
                    <span className="block text-sm font-medium text-slate-500">Tags</span>
                    <span>{formData.tags}</span>
                </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
                <span className="block text-sm font-medium text-slate-500 mb-2">Problem Statement Preview</span>
                <div className="p-4 bg-slate-800 rounded-lg text-sm max-h-40 overflow-y-auto">
                    {formData.problemStatement.substring(0, 300)}...
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-800">
                <div>
                    <span className="block text-sm font-medium text-slate-500 mb-2">Input Format</span>
                    <pre className="p-3 bg-slate-800 rounded font-mono text-xs">{formData.inputFormat}</pre>
                </div>
                <div>
                    <span className="block text-sm font-medium text-slate-500 mb-2">Output Format</span>
                    <pre className="p-3 bg-slate-800 rounded font-mono text-xs">{formData.outputFormat}</pre>
                </div>
            </div>
        </div>
    );
}
