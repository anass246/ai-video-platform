import React from 'react';

// كنعرفو النوع ديال المعلومات اللي غايستقبل
interface VideoPlayerProps {
    videoUrl: string | null;
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
    return (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl">
            {videoUrl ? (
                // بما أن Pollinations كيعطي تصويرة، غانعرضوها فـ img
                <img
                    src={videoUrl}
                    alt="Generated Content"
                    className="w-full h-full object-cover animate-in fade-in duration-1000"
                />
            ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground bg-white/5">
                    <p>Waiting for generation...</p>
                </div>
            )}

            {/* ديكور باش يبان بحال Player */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">▶</div>
                <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-primary origin-left animate-[shimmer_2s_infinite]"></div>
                </div>
            </div>
        </div>
    );
}