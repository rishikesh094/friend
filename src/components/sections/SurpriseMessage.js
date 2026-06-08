'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaGift } from 'react-icons/fa';
import styles from './SurpriseMessage.module.css';

export default function SurpriseMessage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      
      // Fire confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ffb7b2', '#e0b0ff', '#a2c1f2']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ffb7b2', '#e0b0ff', '#a2c1f2']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  };

  return (
    <section className={styles.surpriseSection}>
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        {!isOpen ? (
          <motion.div 
            className={styles.giftBox}
            onClick={handleOpen}
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.giftIcon}><FaGift /></div>
            <h3>Click to Open Your Surprise!</h3>
            <p>I have something special to tell you...</p>
          </motion.div>
        ) : (
          <motion.div 
            className={`${styles.messageCard} glass`}
            initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <h2>My Dearest Best Friend,</h2>
            <p>
              I just wanted to take a moment to tell you how incredibly grateful I am for you. 
              You bring so much light, laughter, and joy into my life. Every day spent with you 
              is a gift. Thank you for being you, for being my rock, and for making this world 
              a more beautiful place just by existing in it.
            </p>
            <p className={styles.signature}>Your ______ ✨</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
