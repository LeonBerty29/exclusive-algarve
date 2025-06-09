'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import HeroSearch from './search-component';

const videos = [
  '/videos/hero-video-1.mp4',
  '/videos/hero-video-2.mp4',
  '/videos/hero-video-3.mp4',
];

export default function HeroSection() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  // const [searchParams, setSearchParams] = useState({
  //   type: '',
  //   location: '',
  //   priceRange: [0, 10000000],
  //   bedrooms: ''
  // });

  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentVideo((prev) => (prev + 1) % videos.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [isPlaying]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {videos.map((video, index) => (
        <div
          key={video}
          className={cn(
            'absolute inset-0 transition-opacity duration-1000',
            currentVideo === index ? 'opacity-100' : 'opacity-0'
          )}
        >
          <video
            src={video}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      <motion.button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute left-10 bottom-10 flex items-center justify-center  rounded-full bg-black/20 size-10 backdrop-blur-sm transition-all hover:bg-black/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? (
          <Pause className="h-5 w-5 text-[#fff]" fill='#fff' />
        ) : (
          <Play className="h-5 w-5 text-[#fff]" fill='#fff' />
        )}
      </motion.button>

      <div className="absolute right-10 bottom-10 flex gap-2">
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentVideo(index)}
            className={cn(
              'h-[2px] w-12 rounded-none transition-all',
              currentVideo === index ? 'bg-white w-20' : 'bg-white/50'
            )}
          />
        ))}
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-full max-w-7xl -translate-x-1/2 px-4">
        <div className="glassmorphism rounded-xl p-6">
          <HeroSearch />
        </div>
      </div>
    </section>
  );
}