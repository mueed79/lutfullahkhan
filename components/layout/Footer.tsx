"use client";

import Link from "next/link";
import { VolumeX } from "lucide-react";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  return (
    <footer className="relative h-[1272px] bg-[#1c1917] overflow-hidden w-full">
      {/* 1. Painting Background */}
      <div className="absolute inset-0">
        <img 
          src="/footer.jpg" 
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

      {/* 2. Narrative Overlay */}
      <div className="absolute left-[318px] top-[259px] flex flex-col gap-[180px]">
        <div className="space-y-4">
          <h2 className="font-body text-display-md text-white">
            btw, you’re still in the <br />
            <span className="font-heading italic text-display-lg">good old days.</span>
          </h2>
          <p className="font-body text-display-md text-white">so hold on.</p>
        </div>
        
        <div className="flex flex-col items-center text-center gap-4">
          <p className="font-body text-body-1-5xl text-white">help us preserve a precious moment.</p>
          <Link 
            href="/contact" 
            className="font-heading text-display-sm text-white underline decoration-white/30 hover:decoration-white transition-all underline-offset-8"
          >
            get involved.
          </Link>
        </div>
      </div>

      {/* 3. Playing Indicator (Bottom Left) */}
      <div className="absolute left-[84px] bottom-[300px] flex items-end gap-12">
        <div className="flex flex-col gap-2">
          <span className="font-body font-medium text-display-md text-[var(--text-text-light-primary)]">
            Muhabbat Karnay Walay
          </span>
          <span className="font-body text-body-xl text-[var(--text-text-light-primary)] opacity-80">
            Mehdi Hassan
          </span>
        </div>
        
        {/* Play/Mute Control */}
        <div className="mb-2 border-[0.8px] border-[var(--background-bg-brand-solid)] rounded-full p-2 text-[var(--background-bg-brand-solid)] cursor-pointer hover:bg-[var(--background-bg-brand-solid)] hover:text-white transition-all">
          <VolumeX className="h-5 w-5" />
        </div>
      </div>

      {/* 4. Attribution (Bottom Right) */}
      <div className="absolute right-[84px] bottom-[300px] text-[var(--text-text-light-primary)] font-body text-body-xl">
        Oil Painting, Salman Toor
      </div>

      {/* 5. Legal Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[111px] flex items-center justify-between px-[58px] border-t border-white/10 bg-black/10 backdrop-blur-sm">
        <p className="text-body-xl text-[#79716b] font-body">
          © 2026 Lutfullah Khan Sound Archive. All rights reserved.
        </p>
        <div className="opacity-30 grayscale invert brightness-200">
           <Logo light={false} />
        </div>
      </div>
    </footer>
  );
}
