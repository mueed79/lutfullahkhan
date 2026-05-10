"use client";

import Link from "next/link";

interface LogoProps {
  light?: boolean;
  className?: string;
  size?: "small" | "large";
}

export default function Logo({ light = true, className = "", size = "small" }: LogoProps) {
  const textColor = light ? "text-[var(--text-text-light-primary)]" : "text-[var(--text-text-black-primary)]";
  
  if (size === "large") {
    return (
      <div className={`inline-block relative ${className}`}>
        <img 
          src="/biglogo.svg" 
          alt="Lutfullah Khan Archive" 
          className="h-[150px] md:h-[253px] w-auto object-contain"
          style={{ filter: light ? 'none' : 'invert(1) brightness(0)' }}
        />
      </div>
    );
  }

  return (
    <Link href="/" className={`inline-block relative h-[56px] md:h-[62px] w-[120px] md:w-[134px] transition-opacity hover:opacity-80 scale-90 md:scale-100 origin-left ${className}`}>
      <span className={`absolute left-0 top-0 font-body text-[15px] md:text-[17.3px] leading-none ${textColor}`}>
        the
      </span>
      <span className={`absolute left-0 top-[20px] md:top-[22px] font-heading text-[18px] md:text-body-xl leading-none ${textColor}`}>
        Lutfullah Khan
      </span>
      <span className={`absolute left-[70px] md:left-[80px] top-[38px] md:top-[42px] font-body text-[15px] md:text-[17.3px] leading-none ${textColor}`}>
        archive
      </span>
    </Link>
  );
}
