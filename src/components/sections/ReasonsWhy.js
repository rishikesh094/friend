'use client';

import { motion } from 'framer-motion';
import styles from './ReasonsWhy.module.css';

const reasons = [
  { id: 1, front: "Your Vibe", back: "You bring such a calm and fun energy to the lab. It's contagious!" },
  { id: 2, front: "Your Kindness", back: "You care so deeply about your friends(excluding me). It's truly beautiful." },
  { id: 3, front: "Your Conversations", back: "Our random chit-chats are the highlight of my college days." },
  { id: 4, front: "Your Honesty", back: "I can always count on you to tell me the truth, even when it's hard." },
  { id: 5, front: "Your Support", back: "You're always there when I need someone to talk to(sometime)." },
  { id: 6, front: "Your Ideas", back: "Like that time we made that hilarious reel together. Pure genius!" },
  { id: 7, front: "Your Patience", back: "Thank you for putting up with my awkwardness when we first met." },
  { id: 8, front: "Just You", back: "Simply because you are YOU. There's no one else I'd rather sit next to." },
];

export default function ReasonsWhy() {
  return (
    <section className={styles.reasonsSection}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>8 Reasons Why You're Special ✨</h2>
        <p>Hover over the cards to see a little secret</p>
      </motion.div>

      <div className={styles.grid}>
        {reasons.map((reason, index) => (
          <motion.div 
            key={reason.id} 
            className={styles.cardContainer}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
          >
            <div className={styles.card}>
              <div className={`${styles.cardFace} ${styles.cardFront} glass`}>
                <span className={styles.cardNumber}>#{reason.id}</span>
                <h3>{reason.front}</h3>
              </div>
              <div className={`${styles.cardFace} ${styles.cardBack} glass`}>
                <p>{reason.back}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
