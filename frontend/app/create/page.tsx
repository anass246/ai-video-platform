"use client";

import { useState, useRef } from "react";
import Link from "next/link"; // Import Link

export default function CreatePage() {
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setScript("");

    try {
      const res = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await res.json();
      if (data.script) {
        setScript(data.script);
        // Auto-play audio (Browser TTS)
        speak(data.script);
      }
    } catch (err) {
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // الصوت بالإنجليزية
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 pt-32 flex flex-col items-center">
      {/* Navbar Back Button */}
      <div className="absolute top-5 left-5">
        <Link href="/" className="text-gray-400 hover:text-white">
          ← Back Home
        </Link>
      </div>

      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Create Your Viral Video
          </h1>
          <p className="text-gray-400 mt-2">AI Script + Voiceover Generator</p>
        </div>

        {/* Input Section */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-xl">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Topic (e.g., Facts about Morocco)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate 🎬"}
            </button>
          </div>
        </div>

        {/* Result Section (Mock Video Player) */}
        {script && (
          <div className="relative w-full aspect-video bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl flex items-center justify-center">
             {/* Fake Background Video (Placeholder) */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 z-10"></div>
             <img 
               src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
               className="absolute inset-0 w-full h-full object-cover opacity-30"
               alt="Background"
             />

             {/* Subtitles (The Script) */}
             <div className="z-20 p-10 text-center space-y-6">
                <p className="text-xl md:text-2xl font-medium text-white leading-relaxed drop-shadow-lg">
                  "{script}"
                </p>
                
                <button 
                  onClick={() => speak(script)}
                  className="mt-4 px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition flex items-center gap-2 mx-auto"
                >
                  🔊 Replay Voice
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}