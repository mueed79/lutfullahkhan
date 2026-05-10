"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronUp, Music2 } from 'lucide-react';

interface StickyAudioPlayerProps {
  activeTrack?: string;
  theme?: 'orange' | 'dark';
  trackTitle?: string;
  src?: string;
  isVisible?: boolean;
}

const StickyAudioPlayer: React.FC<StickyAudioPlayerProps> = ({ 
  activeTrack = 'chand roz',
  theme = 'orange',
  trackTitle = 'Chand Roz Aur Meri Jaan',
  src = '/audio/chand-roz.mp3',
  isVisible = true
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = ['tere honton', 'chand roz', 'bol'];
  
  const isOrange = theme === 'orange';
  const finalBgColor = isOrange ? 'bg-[#E65100]' : 'bg-[#1C1816]';
  const finalTextColor = 'text-white';
  const waveformColor = isOrange ? 'white' : '#E65100';

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Full Player Bar */}
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: isMinimized ? 120 : 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed bottom-0 left-0 right-0 h-[80px] ${finalBgColor} ${finalTextColor} z-50 flex items-center px-12 transition-colors duration-700 ease-in-out border-t border-white/10`}
          >
            <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />

            {/* Left: Track List */}
            <div className="flex items-center gap-6 w-1/4">
              {tracks.map((track) => (
                <div key={track} className="relative group cursor-pointer">
                  <span className={`text-[11px] uppercase tracking-[0.2em] transition-all duration-300 font-sans ${
                    activeTrack === track 
                      ? `text-white font-bold italic underline underline-offset-8 decoration-white` 
                      : `text-white/40 hover:text-white`
                  }`}>
                    {track}
                  </span>
                </div>
              ))}
            </div>

            {/* Center: Waveform & Play Control */}
            <div className="flex-1 flex items-center justify-center gap-8">
              <button 
                onClick={togglePlay}
                className={`w-12 h-12 rounded-full border border-white/40 flex items-center justify-center hover:scale-105 transition-transform`}
              >
                {isPlaying ? <Pause size={20} fill="white" className="text-white" /> : <Play size={20} className="ml-1 text-white" fill="white" />}
              </button>

              {/* Waveform Visualization */}
              <div className="flex items-center gap-[3px] h-12 w-[600px] overflow-hidden">
                {[...Array(80)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      height: isPlaying ? [10, 30, 15, 40, 10][i % 5] : 4 
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 0.8, 
                      delay: i * 0.02,
                      ease: "easeInOut"
                    }}
                    className="w-[2px] rounded-full"
                    style={{ backgroundColor: waveformColor, opacity: i > 20 && i < 60 ? 1 : 0.4 }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Track Info */}
            <div className="w-1/4 flex items-center justify-end gap-6">
              <div className="text-right">
                <p className="text-[18px] font-heading italic font-light leading-none">{trackTitle}</p>
                <p className="text-[11px] opacity-60 mt-2 font-mono">0:05</p>
              </div>
              <button 
                onClick={() => setIsMinimized(true)}
                className={`w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors group`}
              >
                <ChevronUp size={18} className="rotate-180 group-hover:translate-y-[2px] transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Minimized Floating Button */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: isMinimized ? 1 : 0,
              opacity: isMinimized ? 1 : 0,
              y: isMinimized ? 0 : 50
            }}
            onClick={() => setIsMinimized(false)}
            className={`fixed bottom-8 right-8 w-14 h-14 rounded-full ${finalBgColor} ${finalTextColor} z-[60] shadow-2xl flex items-center justify-center border border-white/20 transition-colors duration-700 hover:scale-110 active:scale-95`}
          >
            <Music2 size={24} />
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
