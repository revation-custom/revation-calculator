import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

export const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    element.textContent = String(0);
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeInOut",
      onUpdate(value) {
        element.textContent = String(value.toFixed(0));
      },
    });
  }, [ref]);

  return <span ref={ref} />;
};
