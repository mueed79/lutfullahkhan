"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { VolumeX, Volume2 } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <footer className="relative h-[1272px] bg-[#1c1917] overflow-hidden w-full">
      <audio ref={audioRef} src="/audio/mehdi-hassan.mp3" loop />
      {/* 1. Painting Background */}
      <div className="absolute inset-0">
        <img 
          src="/footer.png" 
          alt="Salman Toor Painting" 
          className="w-full h-full object-cover opacity-65"
        />
        {/* Video Overlay */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-40 pointer-events-none"
        >
          <source src="/stars.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* 2. Narrative Overlay - Staggered Layout from Figma */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-[30%] -translate-x-1/2 w-[800px] h-[300px]">
          {/* Main Narrative */}
          <div className="absolute left-0 top-0">
            <h2 className="text-[34px] tracking-tight leading-tight text-white">
              btw, you&rsquo;re still in the <span className="font-heading italic">good old days.</span>
            </h2>
            <p className="text-[34px] font-sans font-regular tracking-tight text-white line-height-[1.1]">so hold on.</p>
          </div>
          
          {/* Sub Narrative - Offset to right and bottom as per Figma (7:607) */}
          <div className="absolute left-[300px] top-[160px] flex flex-col items-start gap-1 pointer-events-auto">
            <p className="text-[28px] text-white font-regular whitespace-nowrap">help us preserve a precious moment.</p>
            <Link 
              href="/" 
              className="text-[28px] text-white underline decoration-white/30 hover:decoration-white transition-all underline-offset-4"
            >
              get involved.
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Playing Indicator (Bottom Left) */}
      <div className="absolute left-[80px] bottom-[320px] flex items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="font-heading text-[36px] text-white leading-none">
              Muhabbat Karnay Walay
            </span>
            {/* Play/Mute Control next to title */}
            <button 
              onClick={togglePlayback}
              className="w-9 h-9 rounded-full border border-brand-primary flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              {isPlaying ? <Volume2 size={18} className="text-white" /> : <VolumeX size={18} className="text-white/40" />}
            </button>
          </div>
          <span className="text-[20px] text-white font-regular mt-2">
            Mehdi Hassan
          </span>
        </div>
      </div>

      {/* 4. Attribution (Bottom Right) */}
      <div className="absolute right-[80px] bottom-[160px] text-white/30 text-[10px] uppercase tracking-[0.2em] font-light">
        Oil Painting, Salman Toor
      </div>

      {/* 5. Legal Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[140px] flex items-center justify-between px-[80px] border-t border-white/5 bg-black/20 backdrop-blur-md">
        <p className="text-[16px] text-white font-regular tracking-wider">
          © 2026 Lutfullah Khan Sound Archive. All rights reserved.
        </p>
        <div className="grayscale brightness-1000 scale-[0.8] origin-right">
           <Logo light={false} />
        </div>
      </div>
    </footer>
  );
}
