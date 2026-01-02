import { Loader2, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';

interface ProcessingStatusProps {
    steps: { id: number; label: string; status: 'pending' | 'processing' | 'completed' }[];
}

export default function ProcessingStatus({ steps }: ProcessingStatusProps) {
    return (
        <div className="w-full max-w-2xl mx-auto mt-8 p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                Processing Video Request...
            </h3>
            <div className="space-y-4">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center gap-3">
                        <div className="flex flex-col items-center gap-1">
                            <div className={clsx("w-6 h-6 rounded-full flex items-center justify-center text-xs border transition-colors duration-500", {
                                "bg-primary border-primary text-primary-foreground": step.status === 'completed',
                                "border-primary text-primary animate-pulse": step.status === 'processing',
                                "border-muted-foreground text-muted-foreground": step.status === 'pending'
                            })}>
                                {step.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                            </div>
                            {index < steps.length - 1 && (
                                <div className={clsx("w-0.5 h-6 transition-colors duration-500", {
                                    "bg-primary": step.status === 'completed',
                                    "bg-border": step.status !== 'completed'
                                })} />
                            )}
                        </div>
                        <span className={clsx("text-sm transition-colors duration-300", {
                            "text-foreground font-medium": step.status === 'processing' || step.status === 'completed',
                            "text-muted-foreground": step.status === 'pending'
                        })}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
