'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import styles from './MusicPlayer.module.css';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  return (
    <section className={styles.musicSection}>
      <audio 
        ref={audioRef} 
        src="/song.mp3" 
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
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
          <h3>Bulleya</h3>
          <p>Sultan</p>
        </div>

        <div className={styles.equalizer}>
          {[...Array(12)].map((_, i) => {
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
