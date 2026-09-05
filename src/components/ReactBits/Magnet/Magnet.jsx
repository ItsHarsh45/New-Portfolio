import { useEffect, useRef } from 'react';

const Magnet = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  wrapperClassName = '',
  innerClassName = '',
  ...props
}) => {
  const magnetRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (disabled) return;
    const el = magnetRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    let isVisible = false;
    let rafId = null;

    const reset = () => {
      inner.style.transition = inactiveTransition;
      inner.style.transform = 'translate3d(0px, 0px, 0)';
    };

    const handleMouseMove = e => {
      if (!isVisible) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distX = Math.abs(centerX - e.clientX);
        const distY = Math.abs(centerY - e.clientY);

        if (distX < rect.width / 2 + padding && distY < rect.height / 2 + padding) {
          inner.style.transition = activeTransition;
          const offsetX = (e.clientX - centerX) / magnetStrength;
          const offsetY = (e.clientY - centerY) / magnetStrength;
          inner.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
        } else {
          reset();
        }
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
      } else {
        window.removeEventListener('mousemove', handleMouseMove);
        if (rafId) cancelAnimationFrame(rafId);
        reset();
      }
    }, { threshold: 0 });

    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [padding, disabled, magnetStrength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: 'relative', display: 'inline-block' }}
      {...props}
    >
      <div
        ref={innerRef}
        className={innerClassName}
        style={{
          transform: 'translate3d(0px, 0px, 0)',
          willChange: 'transform'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Magnet;
