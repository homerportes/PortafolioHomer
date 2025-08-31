import { useEffect, useState, useRef } from 'react';

export const useScrollAnimation = <T extends HTMLElement = HTMLDivElement>(threshold: number = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

export const useGlobalScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observar todos los elementos con la clase animate-on-scroll
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return visibleElements;
};

export const useStaggeredAnimation = (itemCount: number, delay: number = 100) => {
  const [animatedItems, setAnimatedItems] = useState<Set<number>>(new Set());

  const triggerAnimation = () => {
    Array.from({ length: itemCount }, (_, i) => {
      setTimeout(() => {
        setAnimatedItems(prev => new Set(prev).add(i));
      }, i * delay);
    });
  };

  return { animatedItems, triggerAnimation };
};
