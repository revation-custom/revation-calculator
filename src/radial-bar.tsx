import { useEffect, useState } from "react";

const easeInOutQuad = (t) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

const calculatedMarkerPosition = (progress, center, radius) => {
  const angle = (progress / 100) * 2 * Math.PI - Math.PI / 2; // Start at the top (12 o'clock)
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
  };
};

const RadialBarWithPointer = ({
  progressFirstValue = 100,
  progressSecondValue = 100,
  duration = 1000,
}) => {
  const [progress, setProgress] = useState(0); // 애니메이션 진행률 상태값
  const [progressSecond, setProgressSecond] = useState(0); // 애니메이션 진행률 상태값

  const [barDimensions, setBarDimensions] = useState({
    firstBarSize: 710,
    secondBarSize: 509,
    strokeWidth: 28,
    grayStrokeWidth: 8,
    circleRadius: { outside: 23.5, inside: 18 },
  });

  const {
    firstBarSize,
    secondBarSize,
    strokeWidth,
    grayStrokeWidth,
    circleRadius,
  } = barDimensions;

  // 원호 및 반경에 대한 치수 및 계산 공식
  const center1 = firstBarSize / 2;
  const center2 = secondBarSize / 2;

  // 반으로 자른 사이즈에서 선의 두께를 제거한 정확한 반지름 구하기
  const radius1 = center1 - strokeWidth;
  const radius2 = center2 - strokeWidth;

  // 2 * PI * R 공식으로 원의 둘레값 구하기
  const circumference = 2 * Math.PI * radius1;
  const circumference2 = 2 * Math.PI * radius2;

  // 현재 진행률을 백분율로 나눠 둘레를 곱해 둘레의 몇퍼센트까지 그려야하는지에 대한 계산
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  const strokeDashoffset2 =
    circumference2 - (progressSecond / 100) * circumference2;

  // 바를 따라갈 점의 위치 계산식
  const marker1 = calculatedMarkerPosition(progress, center1, radius1);
  const marker2 = calculatedMarkerPosition(progressSecond, center1, radius2);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 1200 && windowWidth <= 1600) {
        setBarDimensions({
          firstBarSize: 710,
          secondBarSize: 509,
          strokeWidth: 28,
          grayStrokeWidth: 8,
          circleRadius: { outside: 23.5, inside: 18 },
        });
      } else if (windowWidth > 674 && windowWidth <= 1200) {
        setBarDimensions({
          firstBarSize: 592,
          secondBarSize: 416,
          strokeWidth: 23,
          grayStrokeWidth: 7,
          circleRadius: { outside: 23.5, inside: 18 },
        });
      } else if (windowWidth <= 674) {
        setBarDimensions({
          firstBarSize: 286,
          secondBarSize: 206,
          strokeWidth: 11,
          grayStrokeWidth: 3,
          circleRadius: { outside: 11.5, inside: 8 },
        });
      }
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let startTime = null;

    const animateProgress = (timestamp) => {
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
  }, [progressFirstValue, progressSecondValue, duration]);

  return (
    <div className="flex justify-center items-center">
      <svg width={firstBarSize} height={firstBarSize}>
        {/* Background Circle (Track) */}
        <circle
          cx={center1}
          cy={center1}
          r={radius1}
          stroke="#CABEB0"
          strokeWidth={grayStrokeWidth}
          fill="none"
          strokeOpacity={0.2}
        />
        <circle
          cx={center1}
          cy={center1}
          r={radius1}
          stroke="#A2A2A5"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${center1} ${center1})`}
        />
        <circle
          cx={marker1.x}
          cy={marker1.y}
          r={circleRadius.inside}
          fill="#A2A2A5"
        />
        <circle
          cx={marker1.x}
          cy={marker1.y}
          r={circleRadius.outside}
          fill="#A2A2A5"
          fillOpacity="0.2"
          stroke="#A2A2A5"
          style={{
            transformOrigin: `${marker1.x}px ${marker1.y}px`,
          }}
          className="animate-pulseAnimation"
        />
        // -------------------------------------------------------------
        <circle
          cx={center1}
          cy={center1}
          r={radius2}
          stroke="#CABEB0"
          strokeWidth={grayStrokeWidth}
          fill="none"
          strokeOpacity={0.2}
        />
        <circle
          cx={center1}
          cy={center1}
          r={radius2}
          stroke="#43564A"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference2}
          strokeDashoffset={strokeDashoffset2}
          transform={`rotate(-90 ${center1} ${center1})`}
        />
        <circle
          cx={marker2.x}
          cy={marker2.y}
          r={circleRadius.inside}
          fill="#43564A"
        />
        <circle
          cx={marker2.x}
          cy={marker2.y}
          r={circleRadius.outside}
          fill="#43564A"
          fillOpacity="0.2"
          stroke="#43564A"
          style={{
            transformOrigin: `${marker2.x}px ${marker2.y}px`,
          }}
          className="animate-pulseAnimation"
        />
      </svg>
    </div>
  );
};

export default RadialBarWithPointer;
