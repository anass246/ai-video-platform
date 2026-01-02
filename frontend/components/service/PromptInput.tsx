'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Wand2 } from 'lucide-react';

interface PromptInputProps {
    onGenerate: (prompt: string) => void;
    isGenerating: boolean;
}

export default function PromptInput({ onGenerate, isGenerating }: PromptInputProps) {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim()) {
            onGenerate(prompt);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto mb-8">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative overflow-hidden rounded-xl border border-border bg-background focus-within:ring-2 focus-within:ring-ring transition-all shadow-lg">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your video idea in detail..."
                        className="w-full min-h-[120px] resize-none bg-transparent p-4 text-lg placeholder:text-muted-foreground focus:outline-none"
                        disabled={isGenerating}
                    />
                    <div className="flex items-center justify-between border-t border-border/50 bg-muted/20 p-3">
                        <div className="text-xs text-muted-foreground">
                            {prompt.length} / 1000 characters
                        </div>
                        <Button
                            type="submit"
                            disabled={!prompt.trim() || isGenerating}
                            className="transition-all duration-300"
                        >
                            <Wand2 className="mr-2 h-4 w-4" />
                            {isGenerating ? 'Generating...' : 'Generate Video'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
