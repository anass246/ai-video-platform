import { Play, Volume2, Maximize } from 'lucide-react';

export default function VideoPlayer() {
    return (
        <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-black border border-border/50 relative group aspect-video">
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors">
                    <Play className="w-12 h-12 text-white fill-white" />
                </button>
            </div>

            {/* Mock Video Content (Gradient Placeholder) */}
            <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
                <span className="text-white/20 font-bold text-4xl">AI GENERATED VIDEO</span>
            </div>

            {/* Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                        <Play className="w-5 h-5 fill-white" />
                        <span className="text-sm">0:00 / 0:15</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Volume2 className="w-5 h-5" />
                        <Maximize className="w-5 h-5" />
                    </div>
                </div>
                <div className="mt-2 w-full h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-primary" />
                </div>
            </div>
        </div>
    );
}
