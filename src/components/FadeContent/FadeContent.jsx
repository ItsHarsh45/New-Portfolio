import { useEffect, useRef, useState } from 'react';
import './FadeContent.css';

const FadeContent = ({
  children,
  direction = 'up',
  threshold = 0.15,
  delay = 0,
  className = '',
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const el = ref.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold]);

  const dirClass = direction === 'left' ? 'fade-content--left' : '';

  return (
    <div
      ref={ref}
      className={`fade-content ${dirClass} ${isVisible ? 'fade-content--visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default FadeContent;
