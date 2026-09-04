import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import './GlowCursor.css';

export default function GlowCursor() {
  const [isDesktop, setIsDesktop] = useState(true);
  
  const cursorX = useSpring(0, { stiffness: 300, damping: 20 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 20 });

  useEffect(() => {
    // Only show on devices with hover capability
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    if (mediaQuery.matches) {
      const moveCursor = (e) => {
        cursorX.set(e.clientX - 150); // offset by half width/height (300/2)
        cursorY.set(e.clientY - 150);
      };
      window.addEventListener('mousemove', moveCursor);
      return () => {
        window.removeEventListener('mousemove', moveCursor);
        mediaQuery.removeEventListener('change', handleMediaChange);
      };
    }
    
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, [cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="glow-cursor"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    />
  );
}
