"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useState } from "react";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Stories", href: "/works" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Set scrolled state for background opacity
    setScrolled(latest > 50);

    // Hide/Show logic
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header 
      animate={{
        y: hidden ? "-100%" : 0,
        backgroundColor: scrolled ? "rgba(28, 25, 23, 0.8)" : "rgba(28, 25, 23, 0)",
        backdropFilter: scrolled ? "blur(8px)" : "blur(0px)",
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 h-[80px] flex items-center px-12 pointer-events-none transition-colors"
    >
      <div className="container mx-auto flex items-center justify-between pointer-events-auto">
        <Logo light={true} />
        
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-[14px] font-body leading-[16.8px] transition-colors hover:text-[var(--text-text-brand-primary)] ${
                pathname === link.href 
                  ? "text-[var(--text-text-brand-primary)]" 
                  : "text-[var(--text-text-light-primary)]"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button className="text-[var(--text-text-light-primary)] hover:text-[var(--text-text-brand-primary)] transition-colors">
            <Search className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
