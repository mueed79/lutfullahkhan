"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AudioPlayerProps {
  src: string;
  title: string;
  artist?: string;
  className?: string;
}

export default function AudioPlayer({ src, title, artist, className }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  return (
    <div className={cn(
      "w-full rounded-[var(--radius-lg)] bg-[var(--background-bg-white)] border border-[var(--border-border-primary)] p-6 shadow-sm",
      className
    )}>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex items-center gap-6">
        {/* Play/Pause Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--background-bg-brand-solid)] text-white shadow-md transition-colors hover:brightness-110"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6 fill-current" />
          ) : (
            <Play className="h-6 w-6 translate-x-0.5 fill-current" />
          )}
        </motion.button>

        {/* Info & Progress */}
        <div className="flex-grow">
          <div className="mb-2 flex items-end justify-between">
            <div>
              <h4 className="font-heading text-body-md font-bold text-[var(--text-text-black-primary)]">{title}</h4>
              {artist && <p className="text-xs text-[var(--text-text-black-tertiary)]">{artist}</p>}
            </div>
            <span className="text-[10px] font-medium text-[var(--text-text-black-quaternary)] tabular-nums">
              {audioRef.current ? formatTime(audioRef.current.currentTime) : "00:00"} / 
              {audioRef.current ? formatTime(audioRef.current.duration) : "00:00"}
            </span>
          </div>

          <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[var(--colors-gray-100)]">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-[var(--colors-brand-500)]"
              style={{ width: `${progress}%` }}
              transition={{ type: "spring", bounce: 0, duration: 0.2 }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="absolute left-0 top-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number) {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
