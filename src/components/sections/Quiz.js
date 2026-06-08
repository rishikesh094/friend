'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import styles from './Quiz.module.css';

const questions = [
  {
    question: "What's our ultimate college activity?",
    options: ["Studying for exams", "Pretending to code while chit-chatting", "Paying attention in class", "Actually finishing assignments"],
    correct: 1, // index 1
    reaction: "Obviously! The lab computers were just props. 🖥️"
  },
  {
    question: "When we first met in the lab, how was I acting?",
    options: ["Super confident", "Loud and annoying", "Very nervous and awkward 😅", "I ignored you"],
    correct: 2,
    reaction: "Yep! It took me some time to get comfortable. 😂"
  },
  {
    question: "What's the best thing we produced in the lab?",
    options: ["A fully functional app", "A perfect grade", "That one hilarious reel 🎬", "A detailed project report"],
    correct: 2,
    reaction: "That reel deserves an Oscar! 🏆"
  },
  {
    question: "What's the secret to our friendship?",
    options: ["We are both angels", "We share the same brain cell", "We never argue", "Magic"],
    correct: 1,
    reaction: "It's true, and we take turns using it! 🧠"
  }
];

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showReaction, setShowReaction] = useState(false);
  const [reactionText, setReactionText] = useState("");
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (index) => {
    const isCorrect = index === questions[currentQ].correct;
    if (isCorrect) setScore(score + 1);
    // actually, we don't care if they get it right, we just want to show the reaction
    // but tracking score is fun
    
    setReactionText(questions[currentQ].reaction);
    setShowReaction(true);

    setTimeout(() => {
      setShowReaction(false);
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        setQuizFinished(true);
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#ffb7b2', '#e0b0ff', '#a2c1f2', '#ffdac1']
        });
      }
    }, 2500);
  };

  const progress = ((currentQ) / questions.length) * 100;

  return (
    <section className={styles.quizSection}>
      <motion.div 
        className={`${styles.quizContainer} glass`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className={styles.header}>
          <h2>Bestie Quiz 🎯</h2>
          <p>Let's see if you really know us!</p>
        </div>

        {!quizFinished ? (
          <>
            <div className={styles.progressBar}>
              <motion.div 
                className={styles.progressFill}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>

            <div className={styles.questionArea}>
              <h3>Question {currentQ + 1} of {questions.length}</h3>
              <p className={styles.questionText}>{questions[currentQ].question}</p>
            </div>

            <div className={styles.optionsArea}>
              <AnimatePresence mode="wait">
                {showReaction ? (
                  <motion.div 
                    key="reaction"
                    className={styles.reactionBox}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <p>{reactionText}</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="options"
                    className={styles.optionsGrid}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {questions[currentQ].options.map((opt, i) => (
                      <button 
                        key={i} 
                        className={styles.optionBtn}
                        onClick={() => handleAnswer(i)}
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </>
        ) : (
          <motion.div 
            className={styles.resultArea}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
          >
            <h2>You scored {score}/{questions.length}!</h2>
            <div className={styles.award}>
              You are officially the<br/>
              <span className={styles.highlight}>World's Best Friend 👑</span>
            </div>
            <button className={styles.restartBtn} onClick={() => {
              setCurrentQ(0); setScore(0); setQuizFinished(false);
            }}>Retake Quiz</button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
