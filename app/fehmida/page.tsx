"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import Image from "next/image";
import StickyAudioPlayer, { type StickyAudioPlayerHandle } from "@/components/media/StickyAudioPlayer";
import RelatedStories from "@/components/layout/RelatedStories";

// Audio track list — user will finalise audio file assignments later.
// Player shows: kab se dil | paish lafz (active on section 3) | badan dareeda
const TRACKS = [
  { src: '/audio/fehmida-s2.mp3', title: 'Paish Lafz',    name: 'Paish Lafz' },
  { src: '/audio/fehmida-s3.mp3', title: 'Shehar Walo',    name: 'Shehar Walo' },
  { src: '/audio/fehmida-s4.mp3', title: 'Badan Dareeda', name: 'badan dareeda' },
];

/* Timestamped Urdu transcript — t is audio.currentTime in seconds */
const TRANSCRIPT: { t: number; text: string }[] = [
  { t: 0,   text: 'تیس مارچ انیس سو تیہتر' },
  { t: 5,   text: 'کب سے دل سہما ہوا تھا' },
  { t: 8,   text: 'کب سے ایک چپ سی لگی تھی' },
  { t: 11,  text: 'بات کرنے سے بھی ڈر لگتا تھا' },
  { t: 15,  text: 'کب سے ایک بار سماعت تھی ہنسی بچوں کی' },
  { t: 18,  text: 'دل کو گھیرے ہوئے رہتے تھے شکوک و اوہام' },
  { t: 24,  text: 'دفعتاً آج یہ مغرب سے چلی کیسی ہوا' },
  { t: 29,  text: 'آج مٹی سے اٹھا کیسا لہو ریز غبار' },
  { t: 34,  text: 'جا بجا سر کو پٹکتا ہوا دیوانہ وار' },
  { t: 38,  text: 'شہر کی کوچوں بازار میں بل کھاتا ہوا' },
  { t: 43,  text: 'رہ گیروں سے لپٹتا ہوا چکراتا ہوا' },
  { t: 48,  text: 'بند دروازوں پہ دیتا ہوا پاگل دستک' },
  { t: 53,  text: 'کسی پرچم کی طرح شہر پہ لہراتا ہوا' },
  { t: 57,  text: 'آج اندیشوں نے یک لخت مجھے چھوڑ دیا' },
  { t: 62,  text: 'یک بہ یک آج میرے دل سے مٹا خوف و ہراس' },
  { t: 68,  text: 'آج سینے میں بھڑکتی ہے عجب خون کی پیاس' },
  { t: 73,  text: 'ایک بگولے کی طرح رقص کو جی چاہتا ہے' },
  { t: 78,  text: 'غمو اندوہ سے پامال و شکستہ تن ہو' },
  { t: 83,  text: 'آؤ اے ہم وطنوں رقص کرو' },
  { t: 87,  text: 'رقص کرو غیظ کا رقص بکھرتے ہوئے پندار کا رقص' },
  { t: 92,  text: 'رنج و رسوائی کا امیدِ نگوں سار کا رقص' },
  { t: 97,  text: 'پیرہن چاک کرو مصلحت اندیشی کا' },
  { t: 101, text: 'اپنے آنسوؤں کی برستی ہوئی بوچھاڑ میں آؤ' },
  { t: 107, text: 'یہ جھجکتے ہوئے بازو تو ہوا میں لہراؤ' },
  { t: 111, text: 'جسم کو رقص کے گرداب میں چکرانے دو' },
  { t: 116, text: 'شہر در شہر جو ہم رقص میں لہرائیں گے' },
  { t: 121, text: 'حلقہ در حلقہ بھنور پڑتے چلے جائیں گے' },
  { t: 126, text: 'جسم و جاں رقص کریں نطق و زبان رقص کریں' },
  { t: 130, text: 'لو ملاتا ہے لہو آج میری رگ رگ میں' },
];

type HeroPhase = 'transcript' | 'name' | 'content';

/* Animated SVG sine wave — only animates when audio is playing */
function SineWave({ isPlaying }: { isPlaying: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const phaseRef = useRef(0);

  // Draw static shape on mount so wave is visible before audio plays
  useEffect(() => {
    const W = 500, H = 110, amp = 36, freq = 2.2;
    let d = `M 0 ${H / 2}`;
    for (let x = 1; x <= W; x += 2) {
      const env = Math.sin((x / W) * Math.PI);
      const y = H / 2 - amp * env * Math.sin((x / W) * Math.PI * 2 * freq);
      d += ` L ${x} ${y}`;
    }
    if (pathRef.current) pathRef.current.setAttribute('d', d);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    let frame: number;
    const draw = () => {
      phaseRef.current += 0.018;
      const W = 500, H = 110, amp = 36, freq = 2.2;
      let d = `M 0 ${H / 2}`;
      for (let x = 1; x <= W; x += 2) {
        const env = Math.sin((x / W) * Math.PI);
        const y = H / 2 - amp * env * Math.sin((x / W) * Math.PI * 2 * freq + phaseRef.current);
        d += ` L ${x} ${y}`;
      }
      if (pathRef.current) pathRef.current.setAttribute('d', d);
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [isPlaying]);
  return (
    <svg width="500" height="110" viewBox="0 0 500 110" className="opacity-70">
      <path ref={pathRef} stroke="#E65100" strokeWidth="2.5" fill="none" />
    </svg>
  );
}

export default function FehmidaPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<StickyAudioPlayerHandle>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(-1);
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isPlayerPlaying, setIsPlayerPlaying] = useState(false);

  /* ── Hero sequence state ────────────────────────────────────────── */
  const [heroPhase, setHeroPhase] = useState<HeroPhase>('transcript');
  const [lineIndex, setLineIndex] = useState(0);
  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const heroAudioRef = useRef<HTMLAudioElement>(null);

  const playerVisible = activeSectionIndex >= 1;
  const currentTrack = TRACKS[selectedTrackIndex] ?? TRACKS[0];
  // Keep src empty until a real section is reached so StickyAudioPlayer's
  // [src] effect fires with the audio element already mounted on first arrival.
  const playerSrc = selectedTrackIndex >= 0 ? currentTrack.src : '';

  const handleTrackSelect = (index: number) => {
    setSelectedTrackIndex(index);
    setIsUserSelected(true);
  };
  // Section 3's track is TRACKS[1] (paish lafz)
  const SECTION3_TRACK = 1;
  const isSection3TrackPlaying = isPlayerPlaying && selectedTrackIndex === SECTION3_TRACK;

  const handleInlinePlay = () => {
    if (isSection3TrackPlaying) {
      playerRef.current?.pause();
    } else {
      setSelectedTrackIndex(SECTION3_TRACK);
      setIsUserSelected(true);
      // Small delay so the src effect can fire before we call play
      setTimeout(() => playerRef.current?.play(), 80);
    }
  };

  const handleTrackEnded = () => {
    if (isPinned) return;
    if (selectedTrackIndex < TRACKS.length - 1) {
      setSelectedTrackIndex(selectedTrackIndex + 1);
      setIsUserSelected(false);
    } else {
      setIsUserSelected(false);
    }
  };

  useEffect(() => {
    if (activeSectionIndex >= 1 && activeSectionIndex <= 2 && !isPinned && !isUserSelected) {
      setSelectedTrackIndex(Math.min(activeSectionIndex - 1, TRACKS.length - 1));
    }
  }, [activeSectionIndex, isUserSelected, isPinned]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* ── Hero audio: load src on mount, never autoplay ──────────────── */
  useEffect(() => {
    const audio = heroAudioRef.current;
    if (!audio) return;
    audio.src = '/audio/fehmida-s1.mp3';
    audio.volume = 0.9;
    audio.preload = 'auto';
    return () => {
      const a = heroAudioRef.current;
      if (a) { a.pause(); a.removeAttribute('src'); a.load(); }
    };
  }, []);

  /* ── Release file when leaving section 0 ────────────────────────── */
  useEffect(() => {
    if (activeSectionIndex === 0) return;
    const audio = heroAudioRef.current;
    if (!audio) return;
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    setIsHeroMuted(true);
  }, [activeSectionIndex]);

  /* ── Wall-clock timer: name at 3s, content at 5s regardless of audio ── */
  useEffect(() => {
    const t1 = setTimeout(() => setHeroPhase('name'), 3000);
    const t2 = setTimeout(() => setHeroPhase('content'), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* ── Transcript line index: exact timestamp lookup on timeupdate ── */
  useEffect(() => {
    const audio = heroAudioRef.current;
    if (!audio) return;
    const tick = () => {
      const t = audio.currentTime + 0.4; // 0.4s look-ahead compensates render lag
      let idx = 0;
      for (let i = TRANSCRIPT.length - 1; i >= 0; i--) {
        if (t >= TRANSCRIPT[i].t) { idx = i; break; }
      }
      setLineIndex(idx);
    };
    audio.addEventListener('timeupdate', tick);
    return () => audio.removeEventListener('timeupdate', tick);
  }, []);

  /* ── Unmute button handler ───────────────────────────────────────── */
  const toggleHeroAudio = () => {
    const audio = heroAudioRef.current;
    if (!audio) return;
    if (isHeroMuted) {
      audio.muted = false;
      audio.play().catch(() => {});
      setIsHeroMuted(false);
    } else {
      audio.pause();
      setIsHeroMuted(true);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onScroll = () => {
      window.dispatchEvent(new CustomEvent('containerScroll', { detail: { scrollTop: container.scrollTop } }));
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

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
        if (progress < 1) { requestAnimationFrame(step); } else {
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

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return;
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) < 40) return;
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
      {/* Hidden hero audio — only active on section 0, fully released afterward */}
      <audio ref={heroAudioRef} preload="auto" />

      <div
        ref={containerRef}
        className="h-screen overflow-y-scroll overflow-x-hidden"
        style={{ scrollbarWidth: 'none', overflowAnchor: 'none' }}
      >

        {/* 1. Hero */}
        <section
          className="h-screen w-full flex-shrink-0 relative overflow-hidden flex items-center px-7 md:px-12"
          style={{ background: 'linear-gradient(180deg, #141312 0%, #232222 100%)' }}
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
            <Image src="/fehmida-hero.png" alt="" fill className="object-cover" />
          </div>

          {/* Sine wave + mute toggle — bottom-left */}
          <div className="absolute bottom-10 left-7 md:left-12 z-30 flex flex-col items-start gap-3">
            {/* Mute/unmute button */}
            <button
              onClick={toggleHeroAudio}
              className="flex items-center gap-2 text-[#E65100] hover:text-[#FF6B35] transition-colors cursor-pointer"
              aria-label={isHeroMuted ? 'Unmute audio' : 'Mute audio'}
            >
              {/* Icon + hotspot ripple rings — disappear on first click */}
              <span className="relative flex items-center justify-center w-5 h-5">
                <AnimatePresence>
                  {isHeroMuted && (
                    <motion.span
                      key="ripples"
                      className="absolute inset-0 pointer-events-none"
                      exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    >
                      {[1.5, 2.4].map((delay, i) => (
                        <motion.span
                          key={i}
                          className="absolute rounded-full border border-[#E65100] inset-[-7px]"
                          animate={{ scale: [1, 3.2], opacity: [0.55 - i * 0.15, 0] }}
                          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.5, delay }}
                        />
                      ))}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isHeroMuted
                  ? <VolumeX size={20} strokeWidth={1.5} />
                  : <Volume2 size={20} strokeWidth={1.5} />}
              </span>
              <span className="font-sans text-[12px] uppercase tracking-[1.5px] text-[#E65100]">
                {isHeroMuted ? 'play audio' : 'mute'}
              </span>
            </button>
            {/* Sine wave — click anywhere on it to play/pause */}
            <button
              onClick={toggleHeroAudio}
              className="cursor-pointer opacity-100 hover:opacity-80 transition-opacity"
              aria-label={isHeroMuted ? 'Play audio' : 'Pause audio'}
            >
              <SineWave isPlaying={!isHeroMuted} />
            </button>
          </div>

          {/* ── DESKTOP content — right of center ── */}
          <div className="hidden md:flex relative z-10 w-full justify-end pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="flex flex-col gap-16 w-[655px] pointer-events-auto"
            >
              {/* Top area: fixed height so quote bar never shifts position */}
              <div className="h-[200px] flex items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  {heroPhase === 'name' && (
                    <motion.p
                      key="name"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className="font-heading italic text-[52px] leading-[1.1] text-[#FAF5EF]"
                    >
                      Fehmida Riaz
                    </motion.p>
                  )}
                  {heroPhase === 'content' && (
                    <motion.p
                      key="content"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="font-sans text-[28px] leading-[1.2] text-[#FAF5EF]"
                    >
                      March 1973, Rawalpindi: The police opened fire on a National Awami Party rally.
                      <br /><br />
                      Amidst the smoke and chaos, the voice of <em>Fehmida Riaz</em> transformed fear into collective reckoning.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Quote bar — always shows current transcript position, freezes on pause */}
              <div className="flex items-center gap-8">
                <div className="w-[3px] self-stretch bg-[#E65100] rounded-full shrink-0" />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={lineIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="font-urdu text-[28px] leading-[2] text-[#EDE8DC] text-right"
                    style={{ direction: 'rtl' }}
                  >
                    {TRANSCRIPT[lineIndex].text}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ── MOBILE content — same sequence, smaller ── */}
          <div className="md:hidden relative z-10 w-full flex flex-col gap-8 pt-24">
            {/* Top: hidden during transcript, reveals name → paragraph */}
            <AnimatePresence mode="wait">
              {heroPhase === 'name' && (
                <motion.p
                  key="mob-name"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6 }}
                  className="font-heading italic text-[38px] leading-[1.1] text-[#FAF5EF]"
                >
                  Fehmida Riaz
                </motion.p>
              )}
              {heroPhase === 'content' && (
                <motion.p
                  key="mob-content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="font-sans text-[20px] leading-[1.3] text-[#FAF5EF]"
                >
                  March 1973, Rawalpindi: The police opened fire on a National Awami Party rally.
                  <br /><br />
                  Amidst the smoke and chaos, the voice of <em>Fehmida Riaz</em> transformed fear into collective reckoning.
                </motion.p>
              )}
            </AnimatePresence>

            {/* Quote bar — always shows current transcript position, freezes on pause */}
            <div className="flex items-center gap-5">
              <div className="w-[2px] self-stretch bg-[#E65100] rounded-full shrink-0" />
              <AnimatePresence mode="wait">
                <motion.p
                  key={lineIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="font-urdu text-[22px] leading-[2] text-[#EDE8DC] text-right"
                  style={{ direction: 'rtl' }}
                >
                  {TRANSCRIPT[lineIndex].text}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 2. Exile and Voice */}
        <section className="h-screen w-full flex-shrink-0 relative overflow-hidden flex items-center bg-[#262626] text-[#EDE8DC] px-7 md:px-12">
          <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Left: text */}
            <div className="flex flex-col gap-6 md:gap-8 order-2 md:order-1 overflow-y-auto md:overflow-visible max-h-[55vh] md:max-h-none">
              {/* label: font-sans font-medium text-[16px] uppercase tracking-[1.2px] */}
              <p className="font-sans font-medium text-[16px] uppercase tracking-[1.2px] text-[#E65100]">
                Exile and voice
              </p>
              <div className="font-sans text-[18px] md:text-[24px] leading-[1.25] text-[#EDE8DC] space-y-5">
                <p>
                  In the late 1970s, Fehmida Riaz&apos;s magazine <em>Awaz</em> became a target under General Zia-ul-Haq. The state accused her of sedition; over ten criminal cases were filed, and she was forced to flee Pakistan with her children.
                </p>
                <p>
                  Exile could have silenced her, yet Riaz refused to retreat. Across borders, she continued to write, translate, and speak, insisting that the power of the word could not be confined by prisons, borders, or bans.
                </p>
                <p>
                  Her life in India was a testament to the personal cost of dissent, and a vivid demonstration that a woman&apos;s voice, even under threat, could shape public imagination and conscience.
                </p>
              </div>
            </div>

            {/* Right: photo */}
            <div className="order-1 md:order-2 flex flex-col gap-4">
              <div className="relative w-full h-[280px] md:h-[346px] bg-[#1C1917] overflow-hidden rounded">
                <Image
                  src="/fehmida-cover.jpg"
                  alt="Fehmida Riaz reading at Jamia Millia Islamia, New Delhi, during her exile"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="space-y-1">
                <p className="font-sans text-[13px] md:text-[14px] leading-[1.2] text-[#EDE8DC]">
                  Riaz reading at Jamia Millia Islamia, New Delhi, during her exile
                </p>
                <p className="font-display italic text-[11px] md:text-[12px] leading-[1.2] text-[#EDE8DC] opacity-60">
                  Photo from This Source
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Expression — Fehmida Riaz on expression */}
        {/*
          Images:
          1. /public/spool-woman-collage.png  ← place here
          2. /public/bg-noise.png             ← already exists
        */}
        <section
          className="h-screen w-full flex-shrink-0 relative overflow-hidden"
          style={{ background: '#f1e1d0' }}
        >
          {/* Noise texture — reuses existing /public/bg-noise.png */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <Image src="/bg-noise.png" alt="" fill className="object-cover" />
          </div>

          {/* Collage layer — /public/spool-woman-collage.png */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <Image
              src="/spool-woman-collage.png"
              alt="Reel-to-reel tape spool and Fehmida Riaz reading"
              fill
              className="object-cover object-left-top"
            />
          </div>

          {/* ── Desktop text block — right side, ~58% from left ── */}
          <div
            className="absolute z-20 hidden md:flex flex-col gap-[10px]"
            style={{ left: '58%', top: '34%' }}
          >
            {/* "Fehmida Riaz on expression" */}
            <div className="flex items-baseline gap-2">
              <span className="font-sans text-[28px] leading-[1.2] text-[#1c1917]">
                Fehmida Riaz on
              </span>
              <span className="font-heading italic text-[36px] leading-[1.18] text-[#e65100]">
                expression
              </span>
            </div>
            {/* Body */}
            <p className="font-sans text-[20px] leading-[1.18] text-[#1c1917] max-w-[565px]">
              When asked to write a foreword for her poetry collection ....
            </p>

            {/* Inline play button */}
            <button
              onClick={handleInlinePlay}
              className="flex items-center gap-3 mt-4 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-[#E65100] flex items-center justify-center flex-shrink-0 group-hover:opacity-85 transition-opacity">
                {isSection3TrackPlaying
                  ? <Pause size={13} fill="white" className="text-white" />
                  : <Play size={13} fill="white" className="ml-[2px] text-white" />}
              </div>
              <span className="font-sans text-[13px] uppercase tracking-[1.2px] text-[#1c1917] opacity-60 group-hover:opacity-80 transition-opacity">
                {isSection3TrackPlaying ? 'pause' : 'listen · shehar walo'}
              </span>
            </button>
          </div>

          {/* ── Mobile text block — bottom of screen ── */}
          <div className="md:hidden absolute bottom-24 left-0 right-0 z-20 flex flex-col gap-3 px-7">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-sans text-[22px] leading-[1.2] text-[#1c1917]">
                Fehmida Riaz on
              </span>
              <span className="font-heading italic text-[28px] leading-[1.18] text-[#e65100]">
                expression
              </span>
            </div>
            <p className="font-sans text-[16px] leading-[1.25] text-[#1c1917]">
              When asked to write a foreword for her poetry collection ....
            </p>
            {/* Mobile inline play */}
            <button
              onClick={handleInlinePlay}
              className="flex items-center gap-3 mt-1 group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#E65100] flex items-center justify-center flex-shrink-0">
                {isSection3TrackPlaying
                  ? <Pause size={12} fill="white" className="text-white" />
                  : <Play size={12} fill="white" className="ml-[2px] text-white" />}
              </div>
              <span className="font-sans text-[11px] uppercase tracking-[1.2px] text-[#1c1917] opacity-50">
                {isSection3TrackPlaying ? 'pause' : 'listen · paish lafz'}
              </span>
            </button>
          </div>
        </section>

        {/* OLD SECTION 3 — Bodies in Public (commented out, replaced by Expression above) */}
        {/*
        <section className="h-screen w-full flex-shrink-0 relative overflow-hidden flex items-center bg-[#EDE8DC] text-[#141312] px-7 md:px-12">
          ...
        </section>
        */}

        {/* OLD SECTION 4 — 1983 Bombay (commented out) */}
        {/*
        <section className="h-screen w-full flex-shrink-0 relative overflow-hidden flex items-center bg-[#141312] text-[#EDE8DC] px-7 md:px-12">
          ...
        </section>
        */}

        {/* 5. Related Stories */}
        <section className="h-screen w-full flex-shrink-0">
          <RelatedStories excludeSlug="fehmida" fullHeight={false} />
        </section>

      </div>

      <StickyAudioPlayer
        ref={playerRef}
        trackTitle={currentTrack.title}
        src={playerSrc}
        isVisible={playerVisible}
        autoPlay={playerVisible && !isUserSelected && !isPinned}
        tracks={TRACKS.map((t) => ({ name: t.name, src: t.src }))}
        currentTrackIndex={selectedTrackIndex}
        onTrackSelect={handleTrackSelect}
        onTrackEnded={handleTrackEnded}
        isPinned={isPinned}
        onPinToggle={setIsPinned}
        onIsPlayingChange={setIsPlayerPlaying}
        variant="orange"
      />
    </>
  );
}
