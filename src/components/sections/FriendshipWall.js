'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './FriendshipWall.module.css';

const notesData = [
  { id: 1, text: "Best lab memories ever!", color: "#fffeb3", rot: -5 },
  { id: 2, text: "I'm so glad we started talking", color: "#ffb3ba", rot: 3 },
  { id: 3, text: "My favorite distraction 🕵️‍♀️", color: "#baffc9", rot: -2 },
  { id: 4, text: "We literally share a brain", color: "#bae1ff", rot: 4 },
  { id: 5, text: "Our chit-chats > actually coding", color: "#e8baff", rot: -4 },
  { id: 6, text: "Best listener ever 👂", color: "#ffb3ba", rot: -3 },
  { id: 7, text: "The real MVP of computer lab 🌙", color: "#bae1ff", rot: 5 },
];

export default function FriendshipWall() {
  const containerRef = useRef(null);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Generate random positions only on client
    const positionedNotes = notesData.map(note => ({
      ...note,
      top: Math.floor(Math.random() * 60) + 10, // 10% to 70%
      left: Math.floor(Math.random() * 70) + 5, // 5% to 75%
    }));
    setNotes(positionedNotes);
  }, []);

  return (
    <section className={styles.wallSection}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>The Wall of Appreciation 📝</h2>
        <p>Drag the sticky notes around!</p>
      </motion.div>

      <div className={styles.wallContainer} ref={containerRef}>
        {notes.map((note, index) => (
          <motion.div
            key={note.id}
            className={styles.stickyNote}
            style={{ 
              backgroundColor: note.color,
              top: `${note.top}%`,
              left: `${note.left}%`,
            }}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            whileDrag={{ scale: 1.1, zIndex: 100, rotate: 0, cursor: "grabbing" }}
            initial={{ opacity: 0, scale: 0, rotate: 0 }}
            whileInView={{ opacity: 1, scale: 1, rotate: note.rot }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
          >
            <div className={styles.pin}></div>
            <p>{note.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
