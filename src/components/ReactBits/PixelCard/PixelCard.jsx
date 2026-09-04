import { useEffect, useRef } from 'react';
import './PixelCard.css';

class Pixel {
  constructor(canvas, context, x, y, color, speed, delay) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

export default function PixelCard({
  variant = 'default',
  gap = 5,
  speed = 35,
  colors = '#f8fafc,#f1f5f9,#cbd5e1',
  noFocus = false,
  className = '',
  children
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pixelsRef = useRef([]);
  const animationRef = useRef(null);
  const timePreviousRef = useRef(performance.now());
  const reducedMotion = useRef(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    
    const initPixels = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
      
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const colorsArr = colors.split(',');
      const pxs = [];

      for (let x = 0; x < width; x += gap) {
        for (let y = 0; y < height; y += gap) {
          const color = colorsArr[Math.floor(Math.random() * colorsArr.length)];
          const dx = x - width / 2;
          const dy = y - height / 2;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const delay = reducedMotion ? 0 : distance;

          pxs.push(
            new Pixel(
              canvas,
              ctx,
              x,
              y,
              color,
              speed * 0.001,
              delay
            )
          );
        }
      }
      pixelsRef.current = pxs;
    };

    const doAnimate = (fnName) => {
      animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
      const timeNow = performance.now();
      const timePassed = timeNow - timePreviousRef.current;

      if (timePassed < 1000 / 60) return;
      timePreviousRef.current = timeNow - (timePassed % (1000 / 60));

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allIdle = true;
      for (let i = 0; i < pixelsRef.current.length; i++) {
        const pixel = pixelsRef.current[i];
        pixel[fnName]();
        if (!pixel.isIdle) {
          allIdle = false;
        }
      }

      if (allIdle && fnName === 'disappear') {
        cancelAnimationFrame(animationRef.current);
      }
    };

    const handleAnimation = (name) => {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame(() => doAnimate(name));
    };

    const onMouseEnter = () => handleAnimation('appear');
    const onMouseLeave = () => handleAnimation('disappear');
    const onFocus = () => {
      if (!noFocus) handleAnimation('appear');
    };
    const onBlur = () => {
      if (!noFocus) handleAnimation('disappear');
    };

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(animationRef.current);
      initPixels();
      // Only clear, don't restart animation unless hovered
    });
    
    resizeObserver.observe(container);
    initPixels();

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('focusin', onFocus);
    container.addEventListener('focusout', onBlur);

    return () => {
      resizeObserver.disconnect();
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('focusin', onFocus);
      container.removeEventListener('focusout', onBlur);
      cancelAnimationFrame(animationRef.current);
    };
  }, [gap, speed, colors, noFocus, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`pixel-card-container ${variant} ${className}`}
      tabIndex={0}
    >
      <canvas ref={canvasRef} className="pixel-card-canvas" />
      <div className="pixel-card-content">
        {children}
      </div>
    </div>
  );
}
