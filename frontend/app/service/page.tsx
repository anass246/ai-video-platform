
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
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const handleGenerate = async (prompt: string) => {
        // 1. كنبداو التحميل
        setIsGenerating(true);
        setShowVideo(false);
        setSteps(INITIAL_STEPS.map(s => ({ ...s, status: 'pending' })));

        try {
            // كنبينو للمستخدم أننا بدينا
            setSteps(prev => {
                const newSteps = [...prev];
                newSteps[0] = { ...newSteps[0], status: 'processing' };
                return newSteps;
            });

            // 2. كنصيفطو الطلب للباكاند (Laravel)
            const response = await fetch('http://127.0.0.1:8000/api/generate-video', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: prompt }),
            });

            const data = await response.json();

            // 3. ملي كيجي الجواب
            if (data.image_url) {
                // كنسجلو رابط التصويرة (تأكد أن عندك setVideoUrl فبداية الملف)
                if (typeof setVideoUrl === 'function') {
                    setVideoUrl(data.image_url);
                } else {
                    console.log("Video URL:", data.image_url); // غير باش نشوفوها فالكونسول
                }

                // كنقولو للسيت صافي سالينا
                setShowVideo(true);
                setSteps(INITIAL_STEPS.map(s => ({ ...s, status: 'completed' })));
            } else {
                alert("Error: " + (data.error || "Failed to generate"));
            }

        } catch (error) {
            console.error("Connection Error:", error);
            alert("تأكد أن السيرفر ديال Laravel شاعل!");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="container mx-auto px-4 pt-24 pb-8 md:pt-32 md:pb-12">
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
                        {/* هنا التغيير: صيفطنا الرابط للكومبوننت */}
                        <VideoPlayer videoUrl={videoUrl} />

                        <div className="mt-8 text-center">
                            <button
                                onClick={() => {
                                    setShowVideo(false);
                                    setVideoUrl(null); // نخوا الرابط باش نعاودو من جديد
                                }}
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
function setVideoUrl(image_url: any) {
    throw new Error('Function not implemented.');
}

