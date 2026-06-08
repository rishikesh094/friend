'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MemoryGallery.module.css';
import { FaTimes } from 'react-icons/fa';

const photos = [
  { id: 1, placeholder: 'I was so nervous the first time we met in the lab! 😅', caption: 'The First Hello' },
  { id: 2, placeholder: 'That one time we actually stopped talking just long enough to make a hilarious reel! 🎬', caption: 'Our Funny Reel' },
  { id: 3, placeholder: 'Dheere dheere getting comfortable and realizing how amazing you are ✨', caption: 'Getting to Know You' },
  { id: 4, placeholder: 'The lab computers were just an excuse to spend time with you 🖥️', caption: 'Our Favorite Spot' },
  { id: 5, placeholder: 'Too busy talking quietly to even think about taking a photo 🤫', caption: 'Lost in Conversation' },
  { id: 6, placeholder: 'No pictures needed, the memories of us just talking are perfect ❤️', caption: 'Just Us' },
];

export default function MemoryGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [rotations, setRotations] = useState([]);

  useEffect(() => {
    // Generate random rotations only on the client to avoid hydration mismatch
    setRotations(photos.map(() => (Math.random() * 10 - 5).toFixed(1)));
  }, []);

  return (
    <section className={styles.gallerySection}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2>Our Beautiful Memories 📸</h2>
        <p>Click on any photo to see it closer</p>
      </motion.div>

      <div className={styles.galleryGrid}>
        {photos.map((photo, index) => {
          const rotation = rotations[index] || 0;
          return (
            <motion.div 
              key={photo.id}
              className={`${styles.polaroid} glass`}
              style={{ transform: `rotate(${rotation}deg)` }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className={styles.photoWrapper}>
                {photo.src ? (
                  <img src={photo.src} alt={photo.caption} loading="lazy" />
                ) : (
                  <div className={styles.placeholderBox}>
                    <p>{photo.placeholder}</p>
                  </div>
                )}
              </div>
              <div className={styles.caption}>{photo.caption}</div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div 
              className={styles.lightboxContent}
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                className={styles.closeBtn}
                onClick={() => setSelectedPhoto(null)}
              >
                <FaTimes />
              </button>
              {selectedPhoto.src ? (
                <img src={selectedPhoto.src} alt={selectedPhoto.caption} />
              ) : (
                <div className={styles.lightboxPlaceholder}>
                  <p>{selectedPhoto.placeholder}</p>
                </div>
              )}
              <div className={styles.lightboxCaption}>{selectedPhoto.caption}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
