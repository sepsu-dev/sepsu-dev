"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { toast } from "sonner";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<any>(null);
  const iframeId = "youtube-bg-player";

  useEffect(() => {
    // 1. Initialize Player Function
    const initPlayer = () => {
      if (playerRef.current) return; // Prevent duplicate instantiation

      try {
        playerRef.current = new window.YT.Player(iframeId, {
          events: {
            onReady: (event: any) => {
              setPlayerReady(true);
              event.target.setVolume(25); // Set gentle background volume (25%)
            },
            onStateChange: (event: any) => {
              // Re-play video on loop if it finishes (YT.PlayerState.ENDED is 0)
              if (event.data === 0) {
                event.target.playVideo();
              }
            },
          },
        });
      } catch (err) {
        console.error("Error creating YouTube player instance", err);
      }
    };

    // 2. Load API Script if not already loaded
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current || !playerReady) {
      toast.error("Music player is initializing...");
      return;
    }

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!playerRef.current || !playerReady) return;

    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  return (
    <>
      {/* Off-screen hidden YouTube Iframe */}
      <div className="absolute top-0 left-0 w-0 h-0 overflow-hidden pointer-events-none opacity-0">
        <iframe
          id={iframeId}
          width="640"
          height="360"
          src="https://www.youtube.com/embed/w_vmJbemWbk?enablejsapi=1&controls=0&rel=0&showinfo=0&loop=1&playlist=w_vmJbemWbk"
          title="Background Music Player"
          allow="autoplay; encrypted-media"
        ></iframe>
      </div>

      {/* Floating Glassmorphic Player */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 flex items-center gap-1.5 p-1.5 sm:p-2 bg-card/85 dark:bg-[#0d1117]/85 backdrop-blur-md border border-border/50 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all cursor-pointer"
          title={isPlaying ? "Pause Music" : "Play Music"}
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
          ) : (
            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" />
          )}
        </button>

        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3 sm:h-3.5 px-1 sm:px-1.5">
            <span className="w-0.5 bg-primary rounded-full animate-sound-bar-1"></span>
            <span className="w-0.5 bg-primary rounded-full animate-sound-bar-2"></span>
            <span className="w-0.5 bg-primary rounded-full animate-sound-bar-3"></span>
            <span className="w-0.5 bg-primary rounded-full animate-sound-bar-4"></span>
          </div>
        )}

        <div className="hidden sm:flex flex-col max-w-[0px] group-hover:max-w-[120px] overflow-hidden transition-all duration-500 whitespace-nowrap text-left px-0 group-hover:px-2">
          <span className="text-[10px] font-bold text-foreground font-mono">Lofi Ambient</span>
          <span className="text-[8px] text-muted-foreground font-mono">Coding Session</span>
        </div>

        <button
          onClick={toggleMute}
          className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-destructive" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          )}
        </button>
      </div>
    </>
  );
}
