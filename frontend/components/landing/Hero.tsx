import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative overflow-hidden py-24 lg:py-32">
            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
                <div className="inline-flex items-center rounded-full border border-border bg-background/50 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm mb-6">
                    <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                    <span>AI-Powered Video Creation</span>
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Transform ideas into <br className="hidden md:block" />
                    <span className="text-primary">professional videos</span> with AI
                </h1>
                <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 mb-8">
                    Create stunning 4K videos from text in seconds. No editing skills required.
                    Just describe your vision and let our AI handle the rest.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/login">
                        <Button size="lg" className="group">
                            Get Started for Free
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </Link>
                    <Button variant="outline" size="lg">
                        <Sparkles className="mr-2 h-4 w-4" />
                        View Demo
                    </Button>
                </div>
            </div>

            {/* Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent blur-[100px] rounded-full transform -translate-y-1/2" />
            </div>
        </section>
    );
}
