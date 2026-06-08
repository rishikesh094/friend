'use client';

import { motion } from 'framer-motion';
import styles from './SpecialLetter.module.css';

export default function SpecialLetter() {
  return (
    <section className={styles.letterSection}>
      <motion.div 
        className={styles.envelope}
        initial={{ opacity: 0, y: 100, rotate: -3 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
      >
        <div className={styles.paper}>
          <p className={styles.greeting}>To my favorite person,</p>
          
          <p className={styles.bodyText}>
            They say that friends are the family we choose for ourselves. Looking back at everything we've 
            been through, I know I made the best choice. You've seen me at my highest and my lowest, 
            and you never once judged me. Instead, you held my hand, made me laugh when I wanted to cry, 
            and reminded me of who I am when I forgot.
          </p>
          
          <p className={styles.bodyText}>
            You are brilliant, beautiful, and possessing a heart of pure gold. I admire your strength 
            and your endless capacity for kindness. Never forget how amazing you are, and how much you mean 
            to everyone around you—especially me.
          </p>
          
          <p className={styles.bodyText}>
            Here's to a hundred more memories, a thousand more inside jokes, and a lifetime of being 
            absolute menaces together. You're the absolute best!
          </p>
          
          <p className={styles.signoff}>Forever yours,</p>
          <p className={styles.signature}>Your ______ ✨</p>
        </div>
      </motion.div>
    </section>
  );
}
