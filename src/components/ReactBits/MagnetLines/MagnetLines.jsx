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

    const onPointerMove = (pointer) => {
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);

        item.style.setProperty('--rotate', `${r}deg`);
      });
    };

    const handlePointerMove = (e) => onPointerMove({ x: e.clientX, y: e.clientY });
    
    window.addEventListener('pointermove', handlePointerMove);
    
    // Initial calculation (center of screen)
    if (items.length) {
      onPointerMove({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }

    return () => {
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
