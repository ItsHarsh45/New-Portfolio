import { useRef, useEffect } from 'react';
import './MagnetLines.css';

export default function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#ef4444',
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('span');
    let cachedCenters = [];

    const calculateCenters = () => {
      cachedCenters = Array.from(items).map((item) => {
        const rect = item.getBoundingClientRect();
        return {
          x: rect.x + window.scrollX + rect.width / 2,
          y: rect.y + window.scrollY + rect.height / 2,
        };
      });
    };

    calculateCenters();
    window.addEventListener('resize', calculateCenters);

    let animationFrameId = null;
    const handlePointerMove = (e) => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        items.forEach((item, i) => {
          if (!cachedCenters[i]) return;
          const centerX = cachedCenters[i].x;
          const centerY = cachedCenters[i].y;

          const b = e.pageX - centerX;
          const a = e.pageY - centerY;
          const c = Math.sqrt(a * a + b * b) || 1;
          const r = ((Math.acos(b / c) * 180) / Math.PI) * (e.pageY > centerY ? 1 : -1);

          item.style.setProperty('--rotate', `${r}deg`);
        });
      });
    };

    window.addEventListener('pointermove', handlePointerMove);

    // Initial calculation (center of screen)
    if (items.length) {
      handlePointerMove({ pageX: window.innerWidth / 2 + window.scrollX, pageY: window.innerHeight / 2 + window.scrollY });
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', calculateCenters);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`magnet-lines-container ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style
      }}
    >
      {Array.from({ length: rows * columns }).map((_, i) => (
        <span
          key={i}
          className="magnet-line"
          style={{
            '--base-angle': `${baseAngle}deg`,
            '--line-color': lineColor,
            '--line-width': lineWidth,
            '--line-height': lineHeight,
          }}
        />
      ))}
    </div>
  );
}
