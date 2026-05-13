"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronUp } from "lucide-react";
import StickyAudioPlayer from "@/components/media/StickyAudioPlayer";
import RelatedStories from "@/components/layout/RelatedStories";
import DiaryModal from "@/components/ui/DiaryModal";

// Drop audio files into /public/audio/ with these exact filenames:
//   faiz-s2.mp3  →  Recording Sessions section
//   faiz-s3.mp3  →  1911 Sialkot section
//   faiz-s4.mp3  →  1936 Lahore section
//   faiz-s5.mp3  →  1951 Resistance section
const SECTION_AUDIO: Array<{ src: string; title: string; name: string } | null> = [
  null,                                                                     // 0 hero
  { src: '/audio/faiz-s2.mp3', title: 'Tere Honton ki', name: 'Tere honton ki' }, // 1
  { src: '/audio/faiz-s3.mp3', title: 'Chand Roz Aur Meri Jaan',      name: 'Chand roz aur' }, // 2
  { src: '/audio/faiz-s4.mp3', title: 'Bol K Lab Azaad',       name: 'Bol' }, // 3
  { src: '/audio/faiz-s5.mp3', title: 'Tarana, Darbar-e-watan',   name: 'Tarana' }, // 4
];

const TRACK_LIST = SECTION_AUDIO.filter((a) => a !== null) as Array<{ src: string; title: string; name: string }>;

export default function FaizPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0); // 0-3 for s2-s5
  const [isUserSelected, setIsUserSelected] = useState(false); // user manually picked track
  const [isPinned, setIsPinned] = useState(false); // audio is pinned, don't auto-change
  const [showLetterTranscription, setShowLetterTranscription] = useState(false);
  const [diaryOpen, setDiaryOpen] = useState(false);
  const [sialkotExpanded, setSialkotExpanded] = useState(false);
  const [beirutExpanded, setBeirutExpanded] = useState(false);

  // When scrolling to a new section (index 1-4), update track only if not pinned and user didn't manually select
  useEffect(() => {
    if (activeSectionIndex >= 1 && activeSectionIndex <= 4 && !isPinned) {
      const sectionTrackIndex = activeSectionIndex - 1; // section 1 → track 0, etc
      if (!isUserSelected) {
        setSelectedTrackIndex(sectionTrackIndex);
      }
    }
  }, [activeSectionIndex, isUserSelected, isPinned]);

  const currentTrack = TRACK_LIST[selectedTrackIndex] || TRACK_LIST[0];
  const playerVisible = activeSectionIndex >= 1;
  // Light-bg sections: 2 (Sialkot), 4 (Beirut), 6 (Bol), 8 (Related Stories) → orange player
  // Dark-bg sections: 1 (Recording), 3 (Resistance), 5 (Karachi), 7 (Final Days) → dark player
  const playerVariant = [2, 4, 6, 8].includes(activeSectionIndex) ? 'orange' : 'dark';

  // Handle manual track selection from player
  const handleTrackSelect = (index: number) => {
    setSelectedTrackIndex(index);
    setIsUserSelected(true);
  };

  // When track finishes, auto-advance to next (unless pinned)
  const handleTrackEnded = () => {
    if (isPinned) return; // Don't auto-advance if pinned
    if (selectedTrackIndex < TRACK_LIST.length - 1) {
      // Auto-advance to next track
      setSelectedTrackIndex(selectedTrackIndex + 1);
      setIsUserSelected(false); // Allow scroll-based changes again
    } else {
      // Last track finished, reset to allow scroll to take over
      setIsUserSelected(false);
    }
  };

  // Toggle pin state
  const handlePinToggle = (pinned: boolean) => {
    setIsPinned(pinned);
  };

  // Prevent body from scrolling — this container owns the scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Fire containerScroll events so the Header can show/hide correctly
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      window.dispatchEvent(
        new CustomEvent('containerScroll', { detail: { scrollTop: container.scrollTop } })
      );
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  // Custom wheel handler — 900 ms cubic-ease-in-out snap animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isAnimating = false;
    let accumulated = 0;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    const snapToSection = (index: number) => {
      const sections = Array.from(container.querySelectorAll('section'));
      const target = sections[index] as HTMLElement | undefined;
      if (!target) return;

      const startTop = container.scrollTop;
      const distance = target.offsetTop - startTop;
      if (Math.abs(distance) < 5) { isAnimating = false; return; }

      const DURATION = 900;
      let start: number | null = null;
      isAnimating = true;
      setActiveSectionIndex(index);

      const step = (ts: number) => {
        if (start === null) start = ts;
        const elapsed = ts - start;
        const progress = Math.min(elapsed / DURATION, 1);
        container.scrollTop = startTop + distance * easeInOutCubic(progress);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          container.scrollTop = target.offsetTop;
          isAnimating = false;
        }
      };
      requestAnimationFrame(step);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating) return;
      accumulated += e.deltaY;
      if (Math.abs(accumulated) < 40) return;
      const dir = accumulated > 0 ? 1 : -1;
      accumulated = 0;
      const sectionCount = container.querySelectorAll('section').length;
      const current = Math.round(container.scrollTop / container.clientHeight);
      const next = Math.max(0, Math.min(sectionCount - 1, current + dir));
      if (next !== current) snapToSection(next);
    };

    // Keyboard arrow / page navigation
    const handleKey = (e: KeyboardEvent) => {
      if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(e.key)) return;
      e.preventDefault();
      if (isAnimating) return;
      const dir = ['ArrowDown', 'PageDown'].includes(e.key) ? 1 : -1;
      const sectionCount = container.querySelectorAll('section').length;
      const current = Math.round(container.scrollTop / container.clientHeight);
      const next = Math.max(0, Math.min(sectionCount - 1, current + dir));
      if (next !== current) snapToSection(next);
    };

    // Touch swipe — mobile snap
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return; // too short — ignore
      const dir = diff > 0 ? 1 : -1;
      const sectionCount = container.querySelectorAll('section').length;
      const current = Math.round(container.scrollTop / container.clientHeight);
      const next = Math.max(0, Math.min(sectionCount - 1, current + dir));
      if (next !== current) snapToSection(next);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKey);
    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <>
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll bg-[#1C1917] text-[#FAF5EF] overflow-x-hidden"
      style={{ scrollbarWidth: 'none' }}
    >
      {/* 1. Hero */}
      <section
        className="h-screen w-full flex-shrink-0 relative overflow-hidden flex flex-col items-center justify-center px-7"
        style={{ background: 'linear-gradient(180deg, #141312 0%, #232222 100%)' }}
      >
        {/* Spool — mobile only */}
        <div className="md:hidden absolute left-1/2 bottom-[-80px] w-[360px] h-[360px] mix-blend-color-dodge opacity-90 pointer-events-none z-[15]" style={{ transform: 'translateX(calc(-50% + 204px))' }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full relative"
          >
            <Image src="/fahmida-spool.png" alt="Tape Spool" fill className="object-contain" priority />
          </motion.div>
        </div>

        {/* Spool — desktop only */}
        <div className="hidden md:block absolute right-[-80px] bottom-[-80px] w-[480px] h-[480px] mix-blend-color-dodge opacity-90 pointer-events-none z-[10]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-full h-full relative"
          >
            <Image src="/fahmida-spool.png" alt="Tape Spool" fill className="object-contain" priority />
          </motion.div>
        </div>

        {/* ── MOBILE layout ── */}
        <div className="md:hidden absolute top-0 left-0 w-full h-full flex flex-col px-7 pt-40 z-20">
          {/* Decorative quote mark */}
          <span className="text-[96px] text-[#2e291f] font-bold select-none" style={{ lineHeight: '56px' }}>&ldquo;</span>

          {/* Quote + attribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 space-y-5"
          >
            <h1 className="text-[48px] font-sans font-medium leading-[1.2] text-[#EDE8DC]">
              &ldquo;Faiz was not my personal friend.<br />
              He was my benefactor.&rdquo;
            </h1>
            <p className="text-[14px] font-sans font-medium text-[#F6EBE0] opacity-80">
              &ndash; Lutfullah Khan
            </p>
          </motion.div>
        </div>

        {/* ── DESKTOP layout ── */}
        <div className="hidden md:block relative z-20 max-w-[900px] text-center mb-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-12"
          >
            <h1 className="text-[64px] font-sans leading-[1.1] tracking-tight text-[#EDE8DC]">
              &ldquo;Faiz was not my personal friend.
              <br />
              He was my <span className="text-[#E65100] italic font-heading font-thin">benefactor</span>.&rdquo;
            </h1>
            <p className="text-body-lg uppercase tracking-[0.4em] opacity-40 font-bold">
              &mdash; Lutfullah Khan
            </p>
          </motion.div>
        </div>

        {/* ── MOBILE "LISTEN" indicator at bottom ── */}
        <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20">
          <span className="text-[10px] uppercase tracking-[0.4em] opacity-60 font-bold text-white">Listen</span>
          <div className="w-[1px] h-16" style={{ background: 'linear-gradient(180deg, rgba(230,81,0,0.8) 0%, rgba(230,81,0,0) 100%)' }} />
        </div>

        {/* ── DESKTOP scroll indicator ── */}
        <div className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-4 z-20">
          <span className="text-[10px] uppercase tracking-[0.4em] opacity-60 font-bold">Scroll</span>
          <div className="w-[2px] h-16" style={{ background: 'linear-gradient(180deg, #E65100 0%, rgba(230, 81, 0, 0) 100%)' }} />
        </div>
      </section>

      {/* 2. Recording Sessions */}
      <section
        className="h-screen w-full flex-shrink-0 relative flex flex-col md:flex-row text-[#EDE8DC]"
        style={{ background: 'linear-gradient(180deg, #232222 0%, #151413 100%)' }}
      >
        <div className="w-full md:w-1/2 relative h-[45vh] md:h-full grayscale">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="relative w-full h-full"
          >
            <Image src="/faiz-portrait-large.png" alt="Faiz portrait" fill className="object-cover" />
          </motion.div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-7 md:px-16 py-8 md:py-0 overflow-y-auto md:overflow-visible max-h-[55vh] md:max-h-none">
          <div className="max-w-[480px] space-y-5 md:space-y-8">
            <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] opacity-40 font-bold">Recording Sessions, Karachi 1964 – 1984</p>
            <div className="relative pl-6 md:pl-10">
              <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#E65100]" />
              <h2 className="text-[18px] md:text-[28px] font-heading font-regular leading-snug">
                &ldquo;Once he entered my studio, he lost no time in preliminary conversation – he did not believe in small talk. He knew what he had to recite and I knew what I had to record.&rdquo;
              </h2>
            </div>
            <p className="text-[14px] md:text-[15px] opacity-60 leading-relaxed font-regular">
              <span className="md:hidden">Over twenty years, Faiz visited Lutfullah Khan&apos;s home whenever he passed through Karachi. He would settle at the table, and within seconds, begin reciting into the microphone.</span>
              <span className="hidden md:inline">Over twenty years, Faiz visited Lutfullah Khan&apos;s home whenever he passed through Karachi. He would settle at the table, and within seconds, begin reciting into the microphone. Poems from published books, from old magazines, from odd couplets copied into somebody&apos;s diary.</span>
            </p>
            <div className="hidden md:flex items-center gap-4 text-[#E65100] pt-2">
              <div className="flex gap-1.5 items-center">
                {[1,2,3].map(i => <div key={i} className={`w-[2px] bg-current ${i===1 ? 'h-3' : i===2 ? 'h-5' : 'h-2'}`} />)}
              </div>
              <span className="text-[12px] md:text-[13px] font-bold uppercase tracking-[0.2em]">His voice is playing below.</span>
            </div>
            <button
              onClick={() => setDiaryOpen(true)}
              className="flex items-center gap-3 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold opacity-60 hover:opacity-100 hover:underline transition-opacity"
            >
              Read Lutfullah Khan&apos;s Full Account <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. 1911 – Sialkot */}
      <section className="h-screen w-full flex-shrink-0 relative flex items-center bg-[#F1E1D0] text-[#1C1917] px-7 md:px-24 overflow-hidden">
        <div className="max-w-[1400px] w-full mx-auto relative z-10">

          {/* Collapsed state */}
          <AnimatePresence mode="wait">
            {!sialkotExpanded ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-[600px] space-y-6 md:space-y-10"
              >
                <p className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-[#E65100] font-bold">1911 – Sialkot</p>
                {/* main text: text-[18px] md:text-[24px] ← font size */}
                <p className="text-[20px] md:text-[24px] font-heading font-light leading-[1.5] md:leading-[1.4]">
                  Born in Sialkot in 1911, <span className="text-[#E65100] italic">Faiz Ahmad Faiz</span> stands as one of South Asia's most resonant voices. A poet of resistance and of the people, his vision of Pakistan was inseparable from a broader commitment to justice, humanity, and solidarity across borders.
                </p>
                <button
                  onClick={() => setSialkotExpanded(true)}
                  className="text-[16px] md:text-[18px] font-heading italic opacity-70 hover:opacity-100 transition-opacity"
                >
                  know more +
                </button>
              </motion.div>
            ) : (
              /* Expanded state — 2-column layout */
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start"
              >
                {/* Left: original content (faded) */}
                <div className="space-y-6 md:space-y-10 opacity-35">
                  <p className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-[#E65100] font-bold">1911 – Sialkot</p>
                  <p className="text-[18px] md:text-[24px] font-heading font-light leading-[1.5] md:leading-[1.4]">
                    Born in Sialkot in 1911, <span className="text-[#E65100] italic">Faiz Ahmad Faiz</span> stands as one of South Asia's most resonant voices. A poet of resistance and of the people, his vision of Pakistan was inseparable from a broader commitment to justice, humanity, and solidarity across borders.
                  </p>
                </div>

                {/* Right: expanded content */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6 md:space-y-10"
                >
                  <p className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-[#E65100] font-bold">1936 – Lahore</p>
                  <p className="text-[18px] md:text-[24px] font-heading font-light leading-[1.5] md:leading-[1.4]">
                    Deeply informed by Marxist ideals, Faiz joined the Progressive Writers’ Movement and spent much of his life confronting oppression, even when it meant prison or exile. 
                  </p>
                  <button
                    onClick={() => setSialkotExpanded(false)}
                    className="text-[16px] md:text-[18px] font-heading italic opacity-70 hover:opacity-100 transition-opacity"
                  >
                    collapse −
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
        <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none mix-blend-multiply">
          <Image src="/bg-noise.png" alt="" fill className="object-repeat" />
        </div>
      </section>


      {/* 4. 1951 – Resistance in confinement (dark bg) */}
      <section className="h-screen w-full flex-shrink-0 relative flex flex-col bg-[#1C1917] justify-between text-[#EDE8DC] px-7 md:px-24 pt-16 pb-32 md:py-24">

        {/* Top-left: label + prose */}
        <div className="max-w-[580px] space-y-4 md:space-y-8">
          {/* label: text-[10px] md:text-[12px] ← size */}
          <p className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-[#E65100] font-bold">1951 – Resistance in confinement</p>
          {/* prose: text-[16px] md:text-[18px] ← size */}
          <div className="space-y-4 md:space-y-5 text-[16px] md:text-[18px] font-regular leading-relaxed opacity-80">
            <p>
              In 1951, he was arrested in the famous Rawalpindi Conspiracy Case and spent four years in jails across Pakistan, often in solitary confinement.
            </p>
            <p>
              With no access to pen or paper, Faiz relied on his memory to compose poems, and, where possible, traced verses onto prison walls with coal. From these years of confinement came some of his most enduring poetry.
            </p>
          </div>
        </div>

        {/* Bottom-right: Urdu poetry + orange line + translation */}
        <div className="self-end flex items-stretch gap-6 md:gap-8">
          <div className="space-y-2 md:space-y-6 text-right">
            {/* Urdu: text-[20px] md:text-[26px] ← size */}
            <p className="text-[18px] md:text-[26px] font-urdu leading-[2.2]" style={{ direction: 'rtl' }}>
              متاعِ لوح و قلم چھن گئی تو کیا غم ہے<br/>
              کہ خونِ دل میں ڈبو لی ہیں انگلیاں میں نے<br/>
              زبان پہ مہر لگی ہے تو کیا
            </p>
            {/* translation: text-[12px] md:text-[13px] ← size */}
            <div className="space-y-1 opacity-55 text-[14px] md:text-[13px] leading-relaxed font-regular text-left mt-4 md:mt-6">
              <p>My pen and tablet, all that I had, taken away from me. But what is there to grieve for?</p>
              <p>For I have dipped my fingers in my heart&apos;s blood</p>
              <p>So what if my lips have been sealed shut?</p>
            </div>
          </div>
          {/* orange vertical rule */}
          <div className="w-[3px] bg-[#E65100] self-stretch shrink-0 rounded-full" />
        </div>

      </section>

      {/* 5. 1977 – Beirut (light bg) */}
      <section className="h-screen w-full flex-shrink-0 relative flex items-center bg-[#F1E1D0] text-[#1C1917] px-7 md:px-24 overflow-hidden">
        <div className="max-w-[1400px] w-full mx-auto relative z-10">
          <AnimatePresence mode="wait">
            {!beirutExpanded ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-[600px] space-y-6 md:space-y-10"
              >
                <p className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-[#E65100] font-bold">1977 – Beirut</p>
                <p className="text-[18px] md:text-[24px] font-heading font-light leading-[1.5] md:leading-[1.4]">
                  After General Zia&apos;s 1977 coup, he went into self-imposed exile in Beirut, where he edited <em>Lotus</em>, the Afro-Asian Writers&apos; Association journal.
                </p>
                <button
                  onClick={() => setBeirutExpanded(true)}
                  className="text-[16px] md:text-[18px] font-heading italic opacity-70 hover:opacity-100 transition-opacity"
                >
                  more context +
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start"
              >
                <div className="space-y-6 md:space-y-10 opacity-35">
                  <p className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] text-[#E65100] font-bold">1977 – Beirut</p>
                  <p className="text-[18px] md:text-[24px] font-heading font-light leading-[1.5] md:leading-[1.4]">
                    After General Zia&apos;s 1977 coup, he went into self-imposed exile in Beirut, where he edited <em>Lotus</em>, the Afro-Asian Writers&apos; Association journal.
                  </p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6 md:space-y-8"
                >
                  <p className="text-[18px] md:text-[24px] font-heading font-light leading-[1.5] md:leading-[1.4]">
                    Faiz&apos;s commitment was profoundly internationalist. He exchanged letters with Turkish revolutionary poet Nâzım Hikmet and maintained a close friendship with Pablo Neruda.
                  </p>
                  <p className="text-[18px] md:text-[24px] font-heading font-light leading-[1.5] md:leading-[1.4]">
                    Embedded in both local and global networks of anti-colonial and anti-imperialist struggle, he understood the fight for justice in Pakistan as necessarily forming part of broader movements for freedom across continents.
                  </p>
                  <button
                    onClick={() => setBeirutExpanded(false)}
                    className="text-[16px] md:text-[18px] font-heading italic opacity-70 hover:opacity-100 transition-opacity"
                  >
                    collapse −
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none mix-blend-multiply">
          <Image src="/bg-noise.png" alt="" fill className="object-repeat" />
        </div>
      </section>

      {/* 6. Recording Sessions, Karachi 1964 – 1984 (dark bg) */}
      <section className="h-screen w-full flex-shrink-0 relative flex items-center bg-[#1C1917] text-[#EDE8DC] px-7 md:px-24">
        <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="space-y-6 md:space-y-8 order-2 md:order-1">
            <p className="text-[12px] md:text-[13px] uppercase tracking-[0.3em] opacity-90 font-bold">RECORDING SESSIONS, KARACHI 1964 – 1984</p>
            <div className="space-y-4 md:space-y-5 text-[16px] md:text-[18px] leading-relaxed opacity-80 font-regular max-w-[500px]">
              <p>
                Although Faiz had recited many of his poems for Lutfullah Khan, a few remained unrecorded. And so Khan carefully prepared a list of what was still missing.
              </p>
              <p>
                In one of their final sessions together, a wheezing sound began to emit from Faiz&apos;s chest, loud and clear.
              </p>
            </div>
            <div className="relative pl-6 md:pl-10 py-2">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#E65100]" />
              <div className="space-y-4 md:space-y-5 max-w-[500px]">
                <p className="text-[18px] md:text-[20px] font-heading font-regular leading-snug">
                  &ldquo;It can be heard in the recording of that particular session ... but he never let that interfere with his contribution to my library.
                </p>
                <p className="text-[18px] md:text-[20px] font-heading font-regular leading-snug">
                  He always preferred a cup of coffee to sip during the recording. Needless to mention, he smoked – before, during, and after.&rdquo;
                </p>
              </div>
            </div>
            <button
              onClick={() => setDiaryOpen(true)}
              className="flex items-center gap-3 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold opacity-60 hover:opacity-100 hover:underline transition-opacity"
            >
              READ LUTFULLAH KHAN&apos;S FULL ACCOUNT <ChevronUp className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col items-center md:items-start gap-4 order-1 md:order-2 w-full">
            <div
              className="relative w-full max-h-[55vh] aspect-[1220/1272] max-w-[320px] md:max-w-[380px] shadow-2xl group cursor-pointer overflow-hidden rounded-sm"
              onClick={() => setShowLetterTranscription(!showLetterTranscription)}
            >
              <Image
                src="/faiz-letter.png"
                alt="Handwritten note"
                fill
                className={`object-contain transition-all duration-700 ${showLetterTranscription ? 'scale-110 blur-sm opacity-20' : 'opacity-100'}`}
              />
              <AnimatePresence>
                {showLetterTranscription && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-[#FAF5EF] flex flex-col items-center justify-center p-6 md:p-10 text-[#1C1917]"
                  >
                    <div className="space-y-6 text-center" style={{ direction: 'rtl' }}>
                      <p className="text-[18px] md:text-[20px] font-urdu leading-[2.2] tracking-tight">
                        ذکر پھر کیجیے اس گوشہِ تنہائی کا<br/>
                        جس میں ہر لحظہ بپا رہتی ہے اک محفلِ لطف
                      </p>
                      <p className="text-[18px] md:text-[20px] font-urdu leading-[2.2] tracking-tight">
                        منزلِ نغمہ گراں، خانہِ شیریں سخناں<br/>
                        سر بہ سر منبعِ سو لطف ہے، یہ منزلِ لطف
                      </p>
                      <p className="text-[18px] md:text-[20px] font-urdu leading-[2.2] tracking-tight">
                        فیض احمد فیض
                      </p>
                    </div>
                    <button className="mt-8 text-[10px] uppercase tracking-[0.2em] font-bold opacity-40 hover:opacity-100 transition-opacity">
                      Click to view original letter
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              {!showLetterTranscription && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="px-4 py-2 bg-white/90 text-black text-[10px] uppercase tracking-[0.2em] font-bold rounded-full">
                    View Transcription
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-[13px] md:text-[14px] opacity-100 font-regular">Handwritten note from Faiz to Lutfullah Khan</p>
              <p className="text-[12px] opacity-60 italic">Photo from This Source</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final Days (dark bg) */}
      <section className="h-screen w-full flex-shrink-0 relative flex items-center justify-center px-7">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-[900px] space-y-16 text-center"
        >
          <p className="text-[14px] md:text-[24px] font-heading italic opacity-90">
            &ldquo;He promised that on his next visit, which was planned in the third week of the same month, he would oblige me. As usual, I did not insist... Little did I know that not all promises can be kept.&rdquo;
          </p>
          <div className="w-24 h-0.5 bg-[#E65100] mx-auto opacity-50" />
          <p className="text-[16px] md:text-[16px] uppercase tracking-[0.3em] opacity-60 font-medium">
            Faiz died in Lahore on November 20, 1984.
          </p>
        </motion.div>
      </section>

      {/* 8. Bol — "Speak" (light bg) */}
      <section className="h-screen w-full flex-shrink-0 relative flex items-center bg-[#F1E1D0] text-[#1C1917] px-7 md:px-24 overflow-hidden">
        <div className="max-w-[1400px] w-full mx-auto flex justify-end relative z-10">
          <div className="max-w-[620px] space-y-10 md:space-y-14">
            <div className="space-y-5 md:space-y-6 text-[16px] md:text-[18px] font-regular leading-relaxed">
              <p>
                To listen to Faiz today, in our own fraught moment, is urgent and inspiring. As he performs his poems, he shows us that poetry can be both{' '}
                <span className="font-heading italic text-[#E65100]">intimate</span> and{' '}
                <span className="font-heading italic text-[#E65100]">revolutionary</span>, capturing both personal longing and collective struggle.
              </p>
              <p>Famously, he calls out:</p>
            </div>
            <div className="flex items-stretch gap-5 md:gap-6 justify-end">
              <div className="space-y-4 md:space-y-6 text-right">
                <p className="text-[24px] md:text-[32px] font-urdu leading-[2.2]" style={{ direction: 'rtl' }}>
                  بول کہ لب آزاد ہیں تیرے<br />
                  بول زبان اب تک تیری ہے
                </p>
                <div className="space-y-1 text-[13px] md:text-[14px] opacity-55 leading-relaxed font-regular text-left">
                  <p>Speak, for your lips are free</p>
                  <p>Speak, your tongue is still yours.</p>
                </div>
              </div>
              <div className="w-[3px] bg-[#E65100] self-stretch shrink-0 rounded-full" />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none mix-blend-multiply">
          <Image src="/bg-noise.png" alt="" fill className="object-repeat" />
        </div>
      </section>

      {/* 9. Related Stories — reusable cross-reference section */}
      <section className="h-screen w-full flex-shrink-0">
        <RelatedStories excludeSlug="faiz" fullHeight={false} />
      </section>

      <StickyAudioPlayer
        trackTitle={currentTrack?.title ?? ''}
        src={currentTrack?.src ?? ''}
        isVisible={playerVisible}
        autoPlay={playerVisible && !isUserSelected && !isPinned}
        tracks={TRACK_LIST.map((t) => ({ name: t.name, src: t.src }))}
        currentTrackIndex={selectedTrackIndex}
        onTrackSelect={handleTrackSelect}
        onTrackEnded={handleTrackEnded}
        isPinned={isPinned}
        onPinToggle={handlePinToggle}
        variant={playerVariant}
      />
    </div>

    <DiaryModal isOpen={diaryOpen} onClose={() => setDiaryOpen(false)} />
    </>
  );
}
