import { useEffect, useState } from 'react';

const useRequestAnimationFrame = (
  duration: number,
  progressFirstValue: number,
  progressSecondValue: number,
  isAnimating: boolean,
) => {
  const [progress, setProgress] = useState(0); // 애니메이션 진행률 상태값
  const [progressSecond, setProgressSecond] = useState(0); // 애니메이션 진행률 상태값

  const easeInOutQuad = (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  useEffect(() => {
    if (!isAnimating) return;
    console.log(1);
    let startTime: number | null = null;

    const animateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const easingProgress = easeInOutQuad(elapsed / duration);
      const currentProgress = Math.min(
        easingProgress * progressFirstValue,
        progressFirstValue,
      );
      const currentProgressSecond = Math.min(
        easingProgress * progressSecondValue,
        progressSecondValue,
      );

      setProgress(currentProgress);
      setProgressSecond(currentProgressSecond);

      if (elapsed < duration) {
        requestAnimationFrame(animateProgress); // Continue animation
      }
    };

    // Start the animation
    requestAnimationFrame(animateProgress);
  }, [progressFirstValue, progressSecondValue, duration, isAnimating]);

  return { progress, progressSecond };
};

export default useRequestAnimationFrame;
