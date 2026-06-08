'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaTimes } from 'react-icons/fa';
import styles from './SecretButton.module.css';
import confetti from 'canvas-confetti';

export default function SecretButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleUnlock = () => {
    setIsOpen(true);
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#ffd700', '#ffa500', '#ff8c00']
    });
  };

  return (
    <>
      <button className={styles.hiddenBtn} onClick={handleUnlock} title="?"></button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              onClick={e => e.stopPropagation()}
            >
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>
              
              <div className={styles.trophy}>
                <FaTrophy />
              </div>
              
              <h2>Unlocked: Forever Best Friend Award 🏆</h2>
              <p>You found the secret button! This award certifies that you are officially the best thing to ever happen to me.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
