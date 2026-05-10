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
    <footer className="relative h-[800px] md:h-[1272px] bg-[#1c1917] overflow-hidden w-full">
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

      {/* 2. Narrative Overlay - Staggered Layout from Figma, Stacked on Mobile */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-6">
        <div className="relative w-full max-w-[800px] h-[400px] md:h-[300px] flex flex-col items-center md:items-start text-center md:text-left">
          {/* Main Narrative */}
          <div className="relative md:absolute left-0 top-0 mb-8 md:mb-0">
            <h2 className="text-[28px] md:text-[34px] tracking-tight leading-tight text-white">
              btw, you&rsquo;re still in the <span className="font-heading italic">good old days.</span>
            </h2>
            <p className="text-[28px] md:text-[34px] font-sans font-regular tracking-tight text-white mt-1">so hold on.</p>
          </div>
          
          {/* Sub Narrative - Offset to right and bottom as per Figma (7:607), Stacked on Mobile */}
          <div className="relative md:absolute md:left-[300px] md:top-[160px] flex flex-col items-center md:items-start gap-1 pointer-events-auto">
            <p className="text-[18px] md:text-[28px] text-white font-regular whitespace-nowrap">help us preserve a precious moment.</p>
            <Link 
              href="/" 
              className="text-[18px] md:text-[28px] text-white underline decoration-white/30 hover:decoration-white transition-all underline-offset-4"
            >
              get involved.
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Playing Indicator (Bottom Left, Centered on Mobile) */}
      <div className="absolute left-1/2 -translate-x-1/2 md:translate-x-0 md:left-[80px] bottom-[230px] md:bottom-[320px] flex items-center gap-4 w-full px-6 justify-center md:justify-start">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-3">
            <span className="font-heading text-[28px] md:text-[36px] text-white leading-none whitespace-nowrap">
              Muhabbat Karnay Walay
            </span>
            {/* Play/Mute Control next to title */}
            <button 
              onClick={togglePlayback}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-brand-primary flex items-center justify-center hover:bg-white/10 transition-colors shrink-0"
            >
              {isPlaying ? <Volume2 size={16} className="text-white" /> : <VolumeX size={16} className="text-white/40" />}
            </button>
          </div>
          <span className="text-[16px] md:text-[20px] text-white font-regular mt-2 opacity-60">
            Mehdi Hassan
          </span>
        </div>
      </div>

      {/* 4. Attribution (Bottom Right, Hidden or Repositioned on Mobile) */}
      <div className="absolute right-6 md:right-[80px] bottom-[200px] md:bottom-[200px] text-white text-[9px] md:text-[14px] uppercase tracking-[0.2em] font-regular text-center w-full md:w-auto">
        Oil Painting, Salman Toor
      </div>

      {/* 5. Legal Bar (Stacked on Mobile) */}
      <div className="absolute bottom-0 left-0 w-full h-auto md:h-[140px] flex flex-col md:flex-row items-center justify-between px-6 md:px-[80px] py-10 md:py-0 border-t border-white/5 bg-black/20 backdrop-blur-md gap-6">
        <p className="text-[12px] md:text-[16px] text-white font-regular tracking-wider text-center md:text-left opacity-40">
          © 2026 Lutfullah Khan Sound Archive. All rights reserved.
        </p>
        <div className="grayscale brightness-1000 scale-[0.7] md:scale-[0.8] origin-center md:origin-right">
           <Logo light={false} />
        </div>
      </div>
    </footer>
  );
}
