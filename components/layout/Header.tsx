"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ChevronDown, Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  /* true while user is on the first snap section — suppresses header bg */
  const [isFirstSection, setIsFirstSection] = useState(true);

  /* ── Non-homepage: visible on load → hidden after first scroll ── */
  const [hoverVisible, setHoverVisible] = useState(true);  // starts true so first setHoverVisible(false) triggers re-render
  const hasScrolledOnce = useRef(false);   // becomes true after first scroll-down
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ── Detect mobile ────────────────────────────────────────────── */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        setIsMobileMenuOpen(false);
      }
      prevScrollY = y;
    };
    const onContainerScroll = (e: Event) => {
      const { scrollTop } = (e as CustomEvent<{ scrollTop: number }>).detail;
      const sectionHeight = window.innerHeight;
      if (scrollTop < sectionHeight * 0.5) {
        // Back at the first section — always visible, no bg
        hasScrolledOnce.current = false;
        setHoverVisible(true);
        setIsFirstSection(true);
      } else {
        hasScrolledOnce.current = true;
        setHoverVisible(false);
        setIsDropdownOpen(false);
        setIsFirstSection(false);
      }
      setIsMobileMenuOpen(false);
    };

    window.addEventListener('scroll', onWindowScroll, { passive: true });
    window.addEventListener('containerScroll', onContainerScroll);
    return () => {
      window.removeEventListener('scroll', onWindowScroll);
      window.removeEventListener('containerScroll', onContainerScroll);
    };
  }, [isHomepage]);

  /* ── Non-homepage: hover-to-reveal (only on desktop after first scroll) */
  useEffect(() => {
    if (isHomepage || isMobile) return;

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
  // Other pages: visible on top section only; on mobile hides after scroll, on desktop uses hover-reveal
  const isHidden = isHomepage
    ? scrolledDown
    : (hasScrolledOnce.current ? !hoverVisible : false);

  /* ── Decide whether bg should be frosted ────────────────────────── */
  // On non-homepage first section (snap-scroll hero), header is always transparent
  const hasBg = isHomepage
    ? (scrolled || isDropdownOpen)
    : (isDropdownOpen || (!isFirstSection && hoverVisible));

  return (
    <>
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

        <nav className="hidden md:flex items-center gap-6 md:gap-10">
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

        {/* Mobile hamburger menu */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-[var(--text-text-light-primary)] hover:text-[var(--text-text-brand-primary)] transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

    </motion.header>

    {/* ── Mobile full-screen menu ───────────────────────────────────────
        z-[60] sits above the sticky header (z-50)                      */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] bg-[#1C1917] flex flex-col md:hidden"
        >
          {/* Top bar: logo + close */}
          <div className="flex items-center justify-between px-6 h-[80px] border-b border-white/10 shrink-0">
            <Logo light={true} />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Stories list */}
          <nav className="flex-1 overflow-y-auto px-6 py-10 flex flex-col gap-1">
            <p className="text-[11px] tracking-[0.12em] uppercase text-white/35 font-sans mb-6">
              Stories
            </p>
            {stories.map((story, idx) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + idx * 0.06, duration: 0.3, ease: 'easeOut' }}
              >
                <Link
                  href={story.slug ? `/${story.slug}` : '#'}
                  className="block py-4 border-b border-white/8 text-[22px] font-medium text-white hover:text-[var(--text-text-brand-primary)] transition-colors font-body"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {story.name}
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
