"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useState } from "react";

const storyItems = [
  "Faiz Ahmed Faiz",
  "Josh Malihabadi",
  "Fahmida Riaz",
  "Hafeez Jalandhari",
  "Atiya Begum Fyzee",
  "Begum Ra'ana Liaquat Ali Khan",
  "Roshan Ara Begum",
  "Akhtar ul-Iman",
];

export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Set scrolled state for background opacity
    setScrolled(latest > 50);

    // Hide/Show logic
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsDropdownOpen(false);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header 
      animate={{
        y: hidden ? "-100%" : 0,
        backgroundColor: scrolled || isDropdownOpen ? "rgba(28, 25, 23, 0.95)" : "rgba(28, 25, 23, 0)",
        backdropFilter: scrolled || isDropdownOpen ? "blur(12px)" : "blur(0px)",
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 h-[80px] flex items-center px-12 pointer-events-none transition-colors border-b border-white/5"
    >
      <div className="container mx-auto flex items-center justify-between pointer-events-auto">
        <Logo light={true} />
        
        <nav className="flex items-center gap-10">
          {/* Stories Dropdown Trigger */}
          <div 
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button 
              className={`flex items-center gap-2 text-[16px] font-medium font-body transition-colors hover:text-[var(--text-text-brand-primary)] ${
                isDropdownOpen ? "text-[var(--text-text-brand-primary)]" : "text-[var(--text-text-light-primary)]"
              }`}
            >
              Stories
              <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-4 w-[600px] bg-[#1C1917] border border-white/20 rounded-sm p-8 shadow-2xl"
                >
                  <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                    {storyItems.map((item) => (
                      <Link
                        key={item}
                        href={item === "Faiz Ahmed Faiz" ? "/faiz" : "#"}
                        className="text-[14px] text-white hover:text-[var(--text-text-brand-primary)] transition-all font-medium hover:translate-x-1 inline-block"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className="text-[var(--text-text-light-primary)] hover:text-[var(--text-text-brand-primary)] transition-colors">
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
