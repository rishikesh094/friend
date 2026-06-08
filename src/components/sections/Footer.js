import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>Thank you for being part of my life.</p>
        <p className={styles.highlight}>Happy Best Friends Day ❤️</p>
      </div>
    </footer>
  );
}
