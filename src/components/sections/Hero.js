'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const [text, setText] = useState('');
  const fullText = "To the most amazing friend who makes every day brighter.";
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.floatingElements}>
        <div className={`${styles.floatItem} ${styles.item1}`}>❤️</div>
        <div className={`${styles.floatItem} ${styles.item2}`}>✨</div>
        <div className={`${styles.floatItem} ${styles.item3}`}>🦋</div>
        <div className={`${styles.floatItem} ${styles.item4}`}>⭐</div>
        <div className={`${styles.floatItem} ${styles.item5}`}>💖</div>
      </div>
      
      <motion.div 
        className={`${styles.glassContainer} glass`}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1 
          className={styles.heading}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
        >
          Happy Best Friends Day ❤️
        </motion.h1>
        <p className={styles.subheading}>{text}<span className={styles.cursor}>|</span></p>
        
        <motion.div 
          className={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
        >
          <span>Scroll down for a surprise</span>
          <div className={styles.mouse}>
            <div className={styles.wheel}></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
