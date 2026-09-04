import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './DecryptedText.css';

const defaultCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+';

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = defaultCharacters,
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  delay = 0,
  animationTitle = '',
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    let interval;
    let currentIteration = 0;

    const getNextChar = () => {
      if (useOriginalCharsOnly) {
        const randomIndex = Math.floor(Math.random() * text.length);
        return text[randomIndex];
      }
      return characters[Math.floor(Math.random() * characters.length)];
    };

    const scramble = () => {
      if (currentIteration >= maxIterations) {
        setDisplayText(text);
        setIsScrambling(false);
        if (!hasAnimated) setHasAnimated(true);
        clearInterval(interval);
        return;
      }

      const shuffledText = text.split('').map((char, index) => {
        if (char === ' ') return ' ';
        
        let shouldReveal = false;
        if (sequential) {
          const progress = currentIteration / maxIterations;
          const charPos = revealDirection === 'start' 
            ? index / text.length 
            : 1 - (index / text.length);
            
          const middleOut = revealDirection === 'center' 
            ? Math.abs(index - text.length / 2) / (text.length / 2) 
            : 1;

          shouldReveal = revealDirection === 'center' 
            ? progress > middleOut 
            : progress > charPos;
        } else {
          shouldReveal = currentIteration > maxIterations * 0.5;
        }

        return shouldReveal ? char : getNextChar();
      });

      setDisplayText(shuffledText.join(''));
      currentIteration++;
    };

    const startTimeout = setTimeout(() => {
      if (!hasAnimated || isHovering) {
        setIsScrambling(true);
        interval = setInterval(scramble, speed);
      }
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(interval);
    };
  }, [text, speed, maxIterations, sequential, revealDirection, useOriginalCharsOnly, characters, isHovering, hasAnimated, delay]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <motion.span
      ref={containerRef}
      className={`decrypted-text-container ${parentClassName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={className}>
        {displayText.split('').map((char, index) => {
          const isRevealed = char === text[index];
          return (
            <span
              key={index}
              className={isRevealed ? '' : encryptedClassName}
            >
              {char}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}
