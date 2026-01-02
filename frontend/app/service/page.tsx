'use client';

import { useState } from 'react';
import PromptInput from '@/components/service/PromptInput';
import ProcessingStatus from '@/components/service/ProcessingStatus';
import VideoPlayer from '@/components/service/VideoPlayer';

interface Step {
    id: number;
    label: string;
    status: 'pending' | 'processing' | 'completed';
}

const INITIAL_STEPS: Step[] = [
    { id: 1, label: 'Analyzing prompt and style requirements', status: 'pending' },
    { id: 2, label: 'Generating storyboard and scene composition', status: 'pending' },
    { id: 3, label: 'Rendering high-resolution video frames', status: 'pending' },
    { id: 4, label: 'Applying post-processing and effects', status: 'pending' },
];

export default function ServicePage() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS);

    const handleGenerate = (prompt: string) => {
        setIsGenerating(true);
        setShowVideo(false);
        setSteps(INITIAL_STEPS.map(s => ({ ...s, status: 'pending' })));

        let currentStep = 0;

        const interval = setInterval(() => {
            setSteps(prev => {
                const newSteps = [...prev];

                // Mark previous step as completed
                if (currentStep > 0) {
                    newSteps[currentStep - 1] = { ...newSteps[currentStep - 1], status: 'completed' };
                }

                // Mark current step as processing
                if (currentStep < newSteps.length) {
                    newSteps[currentStep] = { ...newSteps[currentStep], status: 'processing' };
                }

                return newSteps;
            });

            currentStep++;

            if (currentStep > INITIAL_STEPS.length) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsGenerating(false);
                    setShowVideo(true);
                }, 1000);
            }
        }, 1500);
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold tracking-tight mb-4">Create Your Masterpiece</h1>
                <p className="text-muted-foreground">Describe your vision, and let our AI bring it to life.</p>
            </div>

            <div className="flex flex-col items-center">
                {!showVideo && (
                    <PromptInput onGenerate={handleGenerate} isGenerating={isGenerating} />
                )}

                {isGenerating && (
                    <ProcessingStatus steps={steps} />
                )}

                {showVideo && (
                    <div className="w-full animate-in fade-in zoom-in duration-500">
                        <VideoPlayer />
                        <div className="mt-8 text-center">
                            <button
                                onClick={() => setShowVideo(false)}
                                className="text-sm text-primary hover:underline"
                            >
                                Generate Another Video
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
