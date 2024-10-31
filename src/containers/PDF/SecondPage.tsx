import { Typography } from '../../components/Typography';
import { UNIT } from '../../constants/common';
import { calculatedMarkerPosition } from '../../utils/calculatedMarkerPosition';
import { formatNumber } from '../../utils/formatNumber';
import PdfLayout from './PdfLayout';

const SecondPage = ({
  calculatedCarbonData,
}: {
  calculatedCarbonData: any;
}) => {
  const barDimensions = {
    firstBarSize: 170,
    secondBarSize: 121,
    strokeWidth: 7,
    grayStrokeWidth: 2,
    circleRadius: { outside: 6.9, inside: 5.3 },
  };

  const { firstBarSize, secondBarSize, strokeWidth } = barDimensions;

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
  const strokeDashoffset = circumference - (80 / 100) * circumference;
  const strokeDashoffset2 =
    circumference2 - (calculatedCarbonData.percent / 100) * circumference2;

  // 바를 따라갈 점의 위치 계산식
  const marker1 = calculatedMarkerPosition(80, center1, radius1);
  const marker2 = calculatedMarkerPosition(
    calculatedCarbonData.percent,
    center1,
    radius2,
  );

  return (
    <PdfLayout>
      <div className="flex flex-col px-20 py-32">
        <div className="flex h-[38px] w-full items-center bg-primary-500 font-pretendard text-[10px] font-medium leading-[14px] text-bg-50">
          신규 개발 제품에 대한 탄소 배출 저감량
        </div>
        <div className="mt-[20px] flex">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[3.52px]">
                <Typography
                  color="text-primary-600"
                  className="font-pretendard text-[7px] font-semibold"
                >
                  리베이션 제품 탄소 발생량
                </Typography>
                <Typography
                  color="text-primary-600"
                  className="font-pretendard text-[14px] font-bold"
                >
                  {formatNumber(
                    calculatedCarbonData.revationLastCalculatedData,
                  )}
                </Typography>
                <div className="flex gap-[1px]">
                  <Typography
                    color="text-primary-600"
                    className="font-pretendard text-[7px] font-medium"
                  >
                    약 {formatNumber(calculatedCarbonData.lastCalculatedData)}
                  </Typography>
                  <Typography
                    color="text-primary-600"
                    className="font-geologica text-[7px] font-semibold"
                  >
                    {UNIT}
                  </Typography>
                </div>
              </div>
              <svg width={170} height={170}>
                {/* Background Circle (Track) */}
                <circle
                  cx={center1}
                  cy={center1}
                  r={radius1}
                  stroke="#CABEB0"
                  strokeWidth={barDimensions.grayStrokeWidth}
                  fill="none"
                  strokeOpacity={0.2}
                />
                <circle
                  cx={center1}
                  cy={center1}
                  r={radius1}
                  stroke="#A2A2A5"
                  strokeWidth={barDimensions.strokeWidth}
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  transform={`rotate(-90 ${center1} ${center1})`}
                />
                <circle
                  cx={marker1.x}
                  cy={marker1.y}
                  r={barDimensions.circleRadius.inside}
                  fill="#A2A2A5"
                />
                <circle
                  cx={marker1.x}
                  cy={marker1.y}
                  r={barDimensions.circleRadius.outside}
                  fill="#A2A2A5"
                  fillOpacity="0.2"
                  stroke="#A2A2A5"
                  style={{
                    transformOrigin: `${marker1.x}px ${marker1.y}px`,
                  }}
                />
                // -------------------------------------------------------------
                <circle
                  cx={center1}
                  cy={center1}
                  r={radius2}
                  stroke="#CABEB0"
                  strokeWidth={barDimensions.grayStrokeWidth}
                  fill="none"
                  strokeOpacity={0.2}
                />
                <circle
                  cx={center1}
                  cy={center1}
                  r={radius2}
                  stroke="#43564A"
                  strokeWidth={barDimensions.strokeWidth}
                  fill="none"
                  strokeDasharray={circumference2}
                  strokeDashoffset={strokeDashoffset2}
                  transform={`rotate(-90 ${center1} ${center1})`}
                />
                <circle
                  cx={marker2.x}
                  cy={marker2.y}
                  r={barDimensions.circleRadius.inside}
                  fill="#43564A"
                />
                <circle
                  cx={marker2.x}
                  cy={marker2.y}
                  r={barDimensions.circleRadius.outside}
                  fill="#43564A"
                  fillOpacity="0.2"
                  stroke="#43564A"
                  style={{
                    transformOrigin: `${marker2.x}px ${marker2.y}px`,
                  }}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </PdfLayout>
  );
};

export default SecondPage;
