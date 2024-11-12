import { useState } from 'react';
import useRequestAnimationFrame from '../hooks/useRequestAnimationFrame';
import useResize from '../hooks/useResize';
import { BAR_DIMENSIONS_SIZE } from '../constants/radialBar';
import { calculatedMarkerPosition } from '../utils/calculatedMarkerPosition';
import useDelayAnimating from '../hooks/useDelayAnimating';
import { Typography } from './Typography';
import { formatNumber } from '../utils/formatNumber';
import { UNIT } from '../constants/common';

const RadialBarWithPointer = ({
  progressFirstValue = 100,
  progressSecondValue = 100,
  duration = 1000,
  delay = 1000,
  lastCalculData = 0,
}) => {
  const [barDimensions, setBarDimensions] = useState(BAR_DIMENSIONS_SIZE.lg);
  const { isAnimating } = useDelayAnimating(delay);
  const { progress, progressSecond } = useRequestAnimationFrame(
    duration,
    progressFirstValue,
    progressSecondValue,
    isAnimating,
  );
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 1200 && windowWidth <= 1600) {
      setBarDimensions(BAR_DIMENSIONS_SIZE.lg);
    } else if (windowWidth >= 674 && windowWidth < 1200) {
      setBarDimensions(BAR_DIMENSIONS_SIZE.md);
    } else if (windowWidth < 674) {
      setBarDimensions(BAR_DIMENSIONS_SIZE.sm);
    }
  };
  useResize(handleResize);

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

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        {/* <div className="absolute hidden flex-col items-center gap-2 sm:left-0 sm:top-[100px] sm:flex md:-left-[140px] md:top-[150px]">
          <Typography color="text-gray-500" className="title-lg">
            기존 제품 탄소 발생량
          </Typography>
          <div className="flex">
            <Typography color="text-gray-500" className="body-lg">
              {formatNumber(lastCalculData)}
            </Typography>
            <Typography color="text-gray-500" className="en-body-sm">
              {UNIT}
            </Typography>
          </div>
        </div> */}
        <svg width={firstBarSize} height={firstBarSize}>
          {/* Background Circle (Track) */}
          <circle
            cx={center1}
            cy={center1}
            r={radius1}
            stroke="#A2A2A5"
            strokeWidth={strokeWidth}
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
            strokeLinecap="round"
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
            fill="transparent"
            fillOpacity="0.2"
            stroke="#BCBCBE"
            style={{
              transformOrigin: `${marker1.x}px ${marker1.y}px`,
            }}
            className="z-50 animate-pulseAnimation"
          />
          // -------------------------------------------------------------
          <circle
            cx={center1}
            cy={center1}
            r={radius2}
            stroke="#A2A2A5"
            strokeWidth={strokeWidth}
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
            strokeLinecap="round"
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
            fill="transparent"
            stroke="#91A698"
            style={{
              transformOrigin: `${marker2.x}px ${marker2.y}px`,
            }}
            className="z-50 animate-pulseAnimation"
          />
        </svg>
      </div>
    </div>
  );
};

export default RadialBarWithPointer;
