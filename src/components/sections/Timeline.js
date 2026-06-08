'use client';

import { motion } from 'framer-motion';
import { FaHeart, FaCoffee, FaStar, FaCamera, FaPlane } from 'react-icons/fa';
import styles from './Timeline.module.css';

const milestones = [
  { id: 1, title: 'The First Glance', desc: 'The very first time I saw you, I knew there was something incredibly unique about you. You stood out from the entire class with an aura that was completely your own.', icon: <FaStar />, date: 'Day 1' },
  { id: 2, title: 'A Bumpy Start', desc: 'I wanted to be your friend and approached you, but things didn\'t quite go as planned. Whether it was my awkwardness or just bad timing, everything fell apart at first.', icon: <FaCamera />, date: 'Month 1' },
  { id: 3, title: 'A Second Chance', desc: 'As fate would have it, our paths crossed once again. This time, the universe was on our side, and our beautiful friendship slowly began to blossom.', icon: <FaCoffee />, date: 'Year 2' },
  { id: 4, title: 'Distance & Dedication', desc: 'Our bond grew stronger than ever, but life had other plans as we took different paths for our careers. Despite the distance, our friendship remained just as vibrant and alive.', icon: <FaPlane />, date: 'Year 3' },
  { id: 5, title: 'Forever Besties', desc: 'No matter where life takes us, you will always be my best friend. Our bond is unbreakable.', icon: <FaHeart />, date: 'Now & Always' }
];

export default function Timeline() {
  return (
    <section className={styles.timelineSection}>
      <motion.h2 
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Our Friendship Journey 🛤️
      </motion.h2>
      
      <div className={styles.timeline}>
        {milestones.map((item, index) => (
          <motion.div 
            key={item.id} 
            className={`${styles.timelineItem} ${index % 2 === 0 ? styles.left : styles.right}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.connector}>
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
            </div>
            
            <div className={`${styles.card} glass`}>
              <span className={styles.date}>{item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
