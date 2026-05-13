"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronUp, Music2, Pin } from 'lucide-react';

interface StickyAudioPlayerProps {
  trackTitle?: string;
  src?: string;
  isVisible?: boolean;
  autoPlay?: boolean;
  tracks?: Array<{ name: string; src: string }>;
  onTrackSelect?: (index: number) => void;
  onTrackEnded?: () => void;
  currentTrackIndex?: number;
  isPinned?: boolean;
  onPinToggle?: (pinned: boolean) => void;
  /** 'orange' = warm brand bar (light sections), 'dark' = near-black bar (dark sections) */
  variant?: 'orange' | 'dark';
}

const StickyAudioPlayer: React.FC<StickyAudioPlayerProps> = ({
  trackTitle = '',
  src = '',
  isVisible = true,
  autoPlay = false,
  tracks = [],
  onTrackSelect = () => {},
  onTrackEnded = () => {},
  currentTrackIndex = 0,
  isPinned = false,
  onPinToggle = () => {},
  variant = 'orange',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Load and autoplay when src changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !src) return;
    audio.pause();
    audio.src = src;
    audio.load();
    setCurrentTime("0:00");
    setIsPlaying(false);
    if (autoPlay) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [src]);

  // Stop audio on unmount
  useEffect(() => {
    return () => { audioRef.current?.pause(); };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  /* ── Theme tokens ──────────────────────────────────────────────────────
     bar bg:          bg-[#E65100]        | bg-[#111110]
     waveform bar:    bg-white            | bg-[#E65100]
     waveform opacity idle/play: 35/70%  | 25/65%
     bubble bg:       bg-[#E65100]        | bg-[#111110]               */
  const isDark = variant === 'dark';
  const barBg        = isDark ? 'bg-[#111110]'  : 'bg-[#E65100]';
  const bubbleBg     = isDark ? 'bg-[#111110]'  : 'bg-[#E65100]';
  const waveColor    = isDark ? '#E65100'        : 'white';
  const waveOpacity  = isDark
    ? (isPlaying ? 'opacity-65' : 'opacity-25')
    : (isPlaying ? 'opacity-70' : 'opacity-35');

  /* ── Waveform bar heights (20-value pattern, 80 bars total) ─────────── */
  const BAR_HEIGHTS = [6, 22, 12, 34, 8, 28, 14, 40, 10, 32, 18, 44, 8, 26, 16, 38, 12, 30, 20, 42];

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* ── Full player bar ─────────────────────────────────────────
              height: h-[72px]  |  side padding: px-6 md:px-12         */}
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: isMinimized ? 90 : 0 }}
            exit={{ y: 90 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed bottom-0 left-0 right-0 ${barBg} text-white z-50 border-t border-white/10 transition-colors duration-700`}
          >
            <audio
              ref={audioRef}
              onEnded={() => { setIsPlaying(false); onTrackEnded(); }}
              onTimeUpdate={(e) => setCurrentTime(formatTime((e.target as HTMLAudioElement).currentTime))}
            />

            {/* ── MOBILE LAYOUT (hidden on md+) ───────────────────────── */}
            <div className="flex md:hidden items-center gap-4 px-4 py-3">

              {/* Waveform */}
              <div className={`flex items-center gap-[2px] h-10 shrink-0 overflow-hidden transition-opacity duration-500 ${waveOpacity}`}>
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: isPlaying ? BAR_HEIGHTS[i % BAR_HEIGHTS.length] : 3 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: 'reverse',
                      duration: 0.6 + (i % 7) * 0.07,
                      delay: i * 0.015,
                      ease: 'easeInOut',
                    }}
                    className="w-[2px] rounded-full shrink-0"
                    style={{ backgroundColor: waveColor }}
                  />
                ))}
              </div>

              {/* Track info */}
              <div className="flex-1 flex flex-col gap-[11px] min-w-0">
                <p className="font-sans font-semibold text-[15px] leading-none text-white truncate">
                  {trackTitle}
                </p>
                <div className="flex items-center gap-2">
                  {tracks.map((track, idx) => (
                    <button
                      key={idx}
                      onClick={() => onTrackSelect(idx)}
                      className={`text-[11px] font-sans leading-none transition-colors duration-300 whitespace-nowrap ${
                        idx === currentTrackIndex
                          ? 'text-white underline underline-offset-[4px]'
                          : 'text-white/45'
                      }`}
                    >
                      {track.name.toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Large play button */}
              <button
                onClick={togglePlay}
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 active:scale-95 transition-transform border border-white/20 ${isDark ? 'bg-[#111110]' : 'bg-[#E65100]'}`}
              >
                {isPlaying ? (
                  <Pause size={16} fill="white" className="text-white" />
                ) : (
                  <Play size={16} className="ml-[2px] text-white" fill="white" />
                )}
              </button>
            </div>

            {/* ── DESKTOP LAYOUT (hidden on mobile) ───────────────────── */}
            <div className="hidden md:flex items-center h-[72px] px-12">

              {/* LEFT: Track list */}
              <div className="flex items-center gap-7 shrink-0">
                {tracks.map((track, idx) => (
                  <button
                    key={idx}
                    onClick={() => onTrackSelect(idx)}
                    className={`text-[11px] tracking-[0.04em] transition-all duration-300 font-sans whitespace-nowrap leading-none ${
                      idx === currentTrackIndex
                        ? 'text-white italic underline underline-offset-[5px] decoration-white/70 font-normal cursor-pointer'
                        : 'text-white/45 hover:text-white/75 cursor-pointer font-normal'
                    }`}
                  >
                    {track.name.toLowerCase()}
                  </button>
                ))}
              </div>

              {/* Play */}
              <button
                onClick={togglePlay}
                className="ml-12 w-9 h-9 rounded-full border border-white/50 flex items-center justify-center hover:scale-105 transition-transform shrink-0"
              >
                {isPlaying ? (
                  <Pause size={14} fill="white" className="text-white" />
                ) : (
                  <Play size={14} className="ml-[2px] text-white" fill="white" />
                )}
              </button>

              {/* Waveform */}
              <div className={`flex-1 flex items-center gap-[2.5px] h-10 mx-6 overflow-hidden transition-opacity duration-500 ${waveOpacity}`}>
                {[...Array(80)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: isPlaying ? BAR_HEIGHTS[i % BAR_HEIGHTS.length] : 3 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: 'reverse',
                      duration: 0.6 + (i % 7) * 0.07,
                      delay: i * 0.015,
                      ease: 'easeInOut',
                    }}
                    className="w-[2px] rounded-full shrink-0"
                    style={{ backgroundColor: waveColor }}
                  />
                ))}
              </div>

              {/* RIGHT: title + timestamp + pin + minimize */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <p className="font-display italic text-[13px] leading-none text-white/90 mb-[4px]">
                    {trackTitle}
                  </p>
                  <p className="text-[10px] leading-none text-white/50 tabular-nums">
                    {currentTime}
                  </p>
                </div>
                <button
                  onClick={() => onPinToggle(!isPinned)}
                  className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/10 transition-colors group shrink-0"
                  title={isPinned ? 'Unpin audio' : 'Pin audio'}
                >
                  <Pin size={13} fill={isPinned ? 'white' : 'none'} className={`transition-all ${isPinned ? 'text-white' : 'text-white/55 group-hover:text-white'}`} />
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/10 transition-colors group shrink-0"
                >
                  <ChevronUp size={13} className="rotate-180 group-hover:translate-y-[2px] transition-transform text-white/80" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* ── Minimised bubble ────────────────────────────────────── */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: isMinimized ? 1 : 0, opacity: isMinimized ? 1 : 0 }}
            onClick={() => setIsMinimized(false)}
            className={`fixed bottom-8 right-8 w-14 h-14 rounded-full ${bubbleBg} z-[60] shadow-2xl flex items-center justify-center border border-white/20 hover:scale-110 active:scale-95 transition-transform`}
          >
            <Music2 size={22} />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                <span className="w-2 h-2 bg-[#E65100] rounded-full animate-pulse" />
              </span>
            )}
          </motion.button>
        </>
      )}
    </AnimatePresence>
  );
};

export default StickyAudioPlayer;
