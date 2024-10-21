import { useEffect, useState } from "react";

const easeInOutQuad = (t) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

const RadialBarWithPointer = ({
  firstBarSize = 100,
  secondBarSize = 100,
  strokeWidth = 20,
  progressFirstValue = 100,
  progressSecondValue = 100,
  duration = 1000,
}) => {
  const [progress, setProgress] = useState(0); // 애니메이션 진행률 상태값
  const [progressSecond, setProgressSecond] = useState(0); // 애니메이션 진행률 상태값

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
  const angle = (progress / 100) * 2 * Math.PI - Math.PI / 2; // Start at the top (12 o'clock)
  const markerX = center1 + radius1 * Math.cos(angle);
  const markerY = center1 + radius1 * Math.sin(angle);

  const angle2 = (progressSecond / 100) * 2 * Math.PI - Math.PI / 2; // Start at the top (12 o'clock)
  const markerX2 = center1 + radius2 * Math.cos(angle2);
  const markerY2 = center1 + radius2 * Math.sin(angle2);

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
          stroke="#e6e6e6"
          strokeWidth={8}
          fill="none"
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
        {/* Moving Marker (Pointer) */}
        <circle cx={markerX} cy={markerY} r="17.5" fill="#A2A2A5" />
        <circle
          cx={markerX}
          cy={markerY}
          r="28.5"
          fill="#46564B"
          fillOpacity="0.1"
          stroke="#88888C"
          style={{
            transformOrigin: `${markerX}px ${markerY}px`, // Correctly set transform origin
          }}
          className="animate-pulseAnimation"
        />
        <text
          x={center1}
          y={center1 - 50}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="24"
          fontWeight="600"
          fill="#303D35" // Customize text color
        >
          리베이션 제품 탄소 발생량
        </text>
        <text
          x={center1}
          y={center1}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="48"
          fontWeight="800"
          fill="#43564A" // Customize text color
        >
          64% 절감
        </text>
        <text
          x={center1}
          y={center1 + 50}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="20"
          fontWeight="800"
          fill="#43564A" // Customize text color
        >
          54,223 kg CO2e
        </text>
        // -------------------------------------------------------------
        <circle
          cx={center1}
          cy={center1}
          r={radius2}
          stroke="#efefef"
          strokeWidth={8}
          fill="none"
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
          transform={`rotate(-90 ${center1} ${center1})`} // Rotate circle so it starts at 12 o'clock
        />
        {/* Moving Marker (Pointer) */}
        <circle cx={markerX2} cy={markerY2} r="17.5" fill="#43564A" />
        <circle
          cx={markerX2}
          cy={markerY2}
          r="28.5"
          fill="#46564B"
          fillOpacity="0.1"
          stroke="#88888C"
          style={{
            transformOrigin: `${markerX2}px ${markerY2}px`, // Correctly set transform origin
          }}
          className="animate-pulseAnimation"
        />
      </svg>
    </div>
  );
};

export default RadialBarWithPointer;
