"use client";

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useState } from "react";
import { stories } from "@/lib/data";

/* ── HEADER ────────────────────────────────────────────────────
   Height:           h-[80px] ← change to adjust bar height
   Side padding:     px-6 md:px-12 ← space from screen edges
   Scroll hide:      hides after scrolling 150px down
   Scrolled bg:      rgba(28, 25, 23, 0.95) with blur(12px) ← adjust opacity/blur
   Nav gap:          gap-6 md:gap-10 ← space between nav items
   Stories list:     edit lib/data.ts → stories array to add/remove items
   Dropdown width:   md:w-[600px] ← dropdown panel width on desktop           */
export default function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 50); /* ← 50: scroll distance before bg appears */
    if (latest > previous && latest > 150) { /* ← 150: scroll distance before header hides */
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
        backgroundColor: scrolled || isDropdownOpen ? "rgba(28, 25, 23, 0.95)" : "rgba(28, 25, 23, 0)", /* ← scrolled bg color */
        backdropFilter: scrolled || isDropdownOpen ? "blur(12px)" : "blur(0px)",
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 h-[80px] flex items-center px-6 md:px-12 pointer-events-none transition-colors border-b border-white/5"
    >
      <div className="container mx-auto flex items-center justify-between pointer-events-auto">
        <Logo light={true} />

        <nav className="flex items-center gap-6 md:gap-10"> {/* ← gap-10: space between nav items */}
          {/* Stories dropdown — list items come from lib/data.ts → stories array */}
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

            {/* Dropdown panel — width: md:w-[600px] | padding: p-6 md:p-8 */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-[-20px] md:right-0 mt-4 w-[calc(100vw-2rem)] md:w-[600px] bg-[#1C1917] border border-white/20 rounded-sm p-6 md:p-8 shadow-2xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4"> {/* ← gap-y-4: vertical space between story links */}
                    {stories.map((story) => (
                      <Link
                        key={story.name}
                        href={story.slug ? `/${story.slug}` : "#"}
                        className="text-[14px] text-white hover:text-[var(--text-text-brand-primary)] transition-all font-medium hover:translate-x-1 inline-block py-1 md:py-0"
                      >
                        {story.name}
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
