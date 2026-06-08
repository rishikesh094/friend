'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import styles from './MusicPlayer.module.css';

// Dynamically import ReactPlayer to prevent SSR hydration errors
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgress = (state) => {
    // state.played is a fraction between 0 and 1
    setProgress(state.played * 100);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  // The perfect Hindi friendship song
  const videoUrl = "https://www.youtube.com/watch?v=qzgMEJMEuOQ";

  return (
    <section className={styles.musicSection}>
      <ReactPlayer 
        url={videoUrl}
        playing={isPlaying}
        onProgress={handleProgress}
        onEnded={handleEnded}
        width="0"
        height="0"
        style={{ display: 'none' }}
        config={{
          youtube: {
            playerVars: { 
              origin: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
            }
          }
        }}
      />
      <motion.div 
        className={`${styles.playerContainer} glass`}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className={styles.albumArt}>
          <div className={`${styles.vinyl} ${isPlaying ? styles.spinning : ''}`}>
            <div className={styles.vinylCenter}>❤️</div>
          </div>
        </div>

        <div className={styles.trackInfo}>
          <h3>Tera Yaar Hoon Main</h3>
          <p>Sonu Ke Titu Ki Sweety</p>
        </div>

        <div className={styles.equalizer}>
          {[...Array(12)].map((_, i) => {
            // Fixed pseudo-random durations to prevent hydration mismatch
            const durations = [0.75, 0.9, 0.6, 0.85, 0.55, 0.95, 0.7, 0.65, 0.8, 0.5, 0.88, 0.72];
            const duration = durations[i];
            return (
              <div 
                key={i} 
                className={`${styles.bar} ${isPlaying ? styles.animateBar : ''}`}
                style={{ 
                  animationDuration: `${duration}s`,
                  animationDelay: `${i * 0.05}s`
                }}
              ></div>
            );
          })}
        </div>

        <div className={styles.controls}>
          <button className={styles.iconBtn}><FaStepBackward /></button>
          <button className={styles.playBtn} onClick={togglePlay}>
            {isPlaying ? <FaPause /> : <FaPlay style={{marginLeft: '4px'}} />}
          </button>
          <button className={styles.iconBtn}><FaStepForward /></button>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
        </div>
      </motion.div>
    </section>
  );
}
