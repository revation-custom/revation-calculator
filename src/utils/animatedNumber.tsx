import { animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

export const AnimatedNumber = ({
  value,
  isAnimating,
}: {
  value: number;
  isAnimating: boolean;
}) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;
    if (!isAnimating) return;
    element.textContent = String(0);
    animate(0, value, {
      duration: 1,
      ease: 'easeInOut',
      onUpdate(value) {
        element.textContent = String(value.toFixed(0));
      },
    });
  }, [ref, isAnimating]);

  return <span ref={ref} />;
};
