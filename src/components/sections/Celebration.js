'use client';

import { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import confetti from 'canvas-confetti';
import styles from './Celebration.module.css';

export default function Celebration() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-200px" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isInView) {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section className={styles.celebrationSection} ref={ref}>
      <div className={styles.content}>
        <motion.h2
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring" }}
        >
          Cheers to Us! 🥂
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Thank you for being the most amazing best friend in the universe.
        </motion.p>
      </div>

      {mounted && (
        <>
          <div className={styles.balloons}>
            {[...Array(15)].map((_, i) => (
              <div 
                key={`balloon-${i}`} 
                className={`${styles.balloon} ${styles[`balloon${(i % 5) + 1}`]}`}
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${10 + Math.random() * 10}s`
                }}
              ></div>
            ))}
          </div>

          <div className={styles.heartsRain}>
            {[...Array(30)].map((_, i) => (
              <div 
                key={`heart-${i}`} 
                className={styles.rainHeart}
                style={{ 
                  left: `${Math.random() * 100}%`, 
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${5 + Math.random() * 5}s`
                }}
              >❤️</div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
