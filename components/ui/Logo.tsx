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
          className="h-[253px] w-auto object-contain"
          style={{ filter: light ? 'none' : 'invert(1) brightness(0)' }}
        />
      </div>
    );
  }

  return (
    <Link href="/" className={`inline-block relative h-[62px] w-[134px] transition-opacity hover:opacity-80 ${className}`}>
      <span className={`absolute left-0 top-0 font-body text-[17.3px] leading-none ${textColor}`}>
        the
      </span>
      <span className={`absolute left-0 top-[22px] font-heading text-body-xl leading-none ${textColor}`}>
        Lutfullah Khan
      </span>
      <span className={`absolute left-[80px] top-[42px] font-body text-[17.3px] leading-none ${textColor}`}>
        archive
      </span>
    </Link>
  );
}
