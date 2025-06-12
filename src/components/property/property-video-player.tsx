"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-video bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Loading video...</div>
    </div>
  ),
});

interface PropertyVideo {
  id: string;
  url: string;
  title: string;
  thumbnail?: string;
  duration?: string;
}

interface PropertyVideoPlayerProps {
  videos: PropertyVideo[];
  className?: string;
  autoPlay?: boolean;
  showPlaylist?: boolean;
}

// Types for ReactPlayer
interface ReactPlayerInstance {
  seekTo: (amount: number, type?: "seconds" | "fraction") => void;
  getCurrentTime: () => number;
  getSecondsLoaded: () => number;
  getDuration: () => number;
  getInternalPlayer: () => HTMLVideoElement | null;
}

interface ProgressState {
  played: number;
  playedSeconds: number;
  loaded: number;
  loadedSeconds: number;
}

export function PropertyVideoPlayer({
  videos,
  className = "",
  autoPlay = false,
  showPlaylist = true,
}: PropertyVideoPlayerProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);

  const playerRef = useRef<ReactPlayerInstance>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentVideo = videos[currentVideoIndex];

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (state: ProgressState) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    if (playerRef.current) {
      const target = e.target as HTMLInputElement;
      playerRef.current.seekTo(parseFloat(target.value));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    setMuted(parseFloat(e.target.value) === 0);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVideoSelect = (index: number) => {
    setCurrentVideoIndex(index);
    setPlayed(0);
  };

  const handleNext = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      setPlayed(0);
    }
  };

  const handlePrevious = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
      setPlayed(0);
    }
  };

  if (!videos || videos.length === 0) {
    return (
      <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No videos available</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={containerRef}
        className="relative bg-black rounded-lg overflow-hidden shadow-lg"
      >
        {/* Video Player */}
        <div className="relative aspect-video">
          <ReactPlayer
            ref={playerRef}
            url={currentVideo.url}
            width="100%"
            height="100%"
            playing={playing}
            muted={muted}
            volume={volume}
            onProgress={handleProgress}
            onDuration={setDuration}
            onEnded={handleNext}
            controls={false}
            config={{
              file: {
                attributes: {
                  preload: "metadata",
                  playsInline: true,
                },
              },
            }}
          />

          {/* Custom Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Progress Bar */}
            <div className="mb-3">
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
                className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={handlePlayPause}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  {playing ? <Pause size={24} /> : <Play size={24} />}
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-blue-400 transition-colors"
                  >
                    {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={muted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="text-white text-sm">
                  {formatTime(played * duration)} / {formatTime(duration)}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {videos.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      disabled={currentVideoIndex === 0}
                      className="text-white hover:text-blue-400 disabled:text-gray-500 transition-colors text-sm px-2 py-1 rounded"
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentVideoIndex === videos.length - 1}
                      className="text-white hover:text-blue-400 disabled:text-gray-500 transition-colors text-sm px-2 py-1 rounded"
                    >
                      Next
                    </button>
                  </>
                )}
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize size={20} />
                  ) : (
                    <Maximize size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Video Title Overlay */}
          <div className="absolute top-4 left-4 right-4">
            <h3 className="text-white text-lg font-semibold bg-black/50 px-3 py-1 rounded">
              {currentVideo.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Video Playlist */}
      {showPlaylist && videos.length > 1 && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold mb-3">Property Videos</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => handleVideoSelect(index)}
                className={`relative p-3 rounded-lg border-2 transition-all text-left ${
                  index === currentVideoIndex
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    <Play size={16} className="text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {video.title}
                    </p>
                    {video.duration && (
                      <p className="text-xs text-gray-500">{video.duration}</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
}
