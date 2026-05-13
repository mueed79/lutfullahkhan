"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useState, useEffect, useRef } from "react";
import { stories } from "@/lib/data";

/* ── HEADER ────────────────────────────────────────────────────
   Height:           h-[80px] ← change to adjust bar height
   Side padding:     px-6 md:px-12 ← space from screen edges
   Homepage:         always visible, hides on scroll-down past 150px,
                     reappears on scroll-up
   All other pages:  visible on load; hides after first scroll down;
                     then only reappears when mouse enters top 24px
   Scrolled bg:      rgba(28, 25, 23, 0.95) with blur(12px)
   Nav gap:          gap-6 md:gap-10 ← space between nav items
   Stories list:     edit lib/data.ts → stories array
   Dropdown width:   md:w-[600px]                                    */

const HEADER_HEIGHT = 80;   /* px — matches h-[80px] */
const HOVER_ZONE    = 24;   /* px from top that triggers reveal */

export default function Header() {
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  /* ── Shared ────────────────────────────────────────────────────── */
  const [scrolledDown, setScrolledDown] = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /* ── Non-homepage: visible on load → hidden after first scroll ── */
  const [hoverVisible, setHoverVisible] = useState(true);  // starts true so first setHoverVisible(false) triggers re-render
  const hasScrolledOnce = useRef(false);   // becomes true after first scroll-down
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Homepage: native scroll tracking ──────────────────────────── */
  useEffect(() => {
    if (!isHomepage) return;
    let prevY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      if (y > prevY && y > 150) {
        setScrolledDown(true);
        setIsDropdownOpen(false);
      } else if (y < prevY) {
        setScrolledDown(false);
      }
      prevY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomepage]);

  /* ── Non-homepage: hide on first scroll (window + snap-container) ─ */
  useEffect(() => {
    if (isHomepage) return;

    let prevScrollY = 0;
    const onWindowScroll = () => {
      const y = window.scrollY;
      if (y > prevScrollY && y > 50) {
        hasScrolledOnce.current = true;
        setHoverVisible(false);
        setIsDropdownOpen(false);
      }
      prevScrollY = y;
    };
    const onContainerScroll = (e: Event) => {
      const { scrollTop } = (e as CustomEvent<{ scrollTop: number }>).detail;
      if (scrollTop > 50) {
        hasScrolledOnce.current = true;
        setHoverVisible(false);
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', onWindowScroll, { passive: true });
    window.addEventListener('containerScroll', onContainerScroll);
    return () => {
      window.removeEventListener('scroll', onWindowScroll);
      window.removeEventListener('containerScroll', onContainerScroll);
    };
  }, [isHomepage]);

  /* ── Non-homepage: hover-to-reveal (only active after first scroll) */
  useEffect(() => {
    if (isHomepage) return;

    const onMouseMove = (e: MouseEvent) => {
      // Don't run hide logic until the user has scrolled at least once
      if (!hasScrolledOnce.current) return;

      const y = e.clientY;

      if (y <= HOVER_ZONE) {
        if (hideTimer.current) clearTimeout(hideTimer.current);
        setHoverVisible(true);
      } else if (y > HEADER_HEIGHT + 8) {
        if (hideTimer.current) clearTimeout(hideTimer.current);
        hideTimer.current = setTimeout(() => {
          setHoverVisible(false);
          setIsDropdownOpen(false);
        }, 300);
      } else {
        if (hideTimer.current) clearTimeout(hideTimer.current);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [isHomepage]);

  /* ── Decide visibility ─────────────────────────────────────────── */
  // Homepage: visible until scroll-down
  // Other pages: visible on load (hasScrolledOnce=false), then hover-only
  const isHidden = isHomepage
    ? scrolledDown
    : (hasScrolledOnce.current ? !hoverVisible : false);

  /* ── Decide whether bg should be frosted ────────────────────────── */
  const hasBg = isHomepage
    ? (scrolled || isDropdownOpen)
    : (hoverVisible || isDropdownOpen);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: isHidden ? "-100%" : 0,
        backgroundColor: hasBg ? "rgba(28, 25, 23, 0.95)" : "rgba(28, 25, 23, 0)",
        backdropFilter: hasBg ? "blur(12px)" : "blur(0px)",
      }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 h-[80px] flex items-center px-6 md:px-12 pointer-events-none border-b border-white/5"
    >
      <div className="container mx-auto flex items-center justify-between pointer-events-auto">
        <Logo light={true} />

        <nav className="flex items-center gap-6 md:gap-10">
          {/* Stories dropdown — items from lib/data.ts → stories array */}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
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
