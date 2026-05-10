"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(parseFloat(e.target.value));
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  // Auto-hide controls
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPlaying && showControls) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, showControls]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "group relative aspect-video overflow-hidden rounded-[var(--radius-xl)] bg-black shadow-2xl",
        className
      )}
      onMouseMove={() => setShowControls(true)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="h-full w-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Custom UI Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-6"
          >
            {/* Play/Pause Large Center Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlay}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md transition-colors hover:bg-white/30"
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8 text-white fill-current" />
                ) : (
                  <Play className="h-8 w-8 translate-x-1 text-white fill-current" />
                )}
              </motion.button>
            </div>

            {/* Bottom Controls */}
            <div className="space-y-4">
              {/* Progress Bar */}
              <div className="relative h-1 w-full bg-white/20">
                <div 
                  className="absolute left-0 top-0 h-full bg-[var(--colors-brand-500)] transition-all"
                  style={{ width: `${progress}%` }}
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

              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-6">
                  <button onClick={togglePlay}>
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  <button onClick={toggleMute}>
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                  <span className="text-xs font-medium">
                    {videoRef.current ? formatTime(videoRef.current.currentTime) : "00:00"} / 
                    {videoRef.current ? formatTime(videoRef.current.duration) : "00:00"}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <button onClick={toggleFullscreen}>
                    <Maximize className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatTime(seconds: number) {
  if (isNaN(seconds)) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
