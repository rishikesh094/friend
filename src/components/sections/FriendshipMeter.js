'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './FriendshipMeter.module.css';

export default function FriendshipMeter() {
  const [percent, setPercent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let current = 0;
      const target = 1000;
      const duration = 2500; // 2.5 seconds
      const interval = 20;
      const step = (target / duration) * interval;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          setPercent(target);
          clearInterval(timer);
        } else {
          setPercent(Math.floor(current));
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <section className={styles.meterSection} ref={ref}>
      <motion.div 
        className={`${styles.container} glass`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <h2>Friendship Power Level ⚡</h2>
        
        <div className={styles.meterContainer}>
          <div className={styles.meterFill} style={{ width: `${Math.min(percent / 10, 100)}%` }}>
            <div className={styles.sparkles}>✨</div>
          </div>
        </div>

        <div className={styles.percentage}>
          {percent}%
        </div>
        
        {percent >= 1000 && (
          <motion.div 
            className={styles.message}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Beyond Measurement ❤️
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
