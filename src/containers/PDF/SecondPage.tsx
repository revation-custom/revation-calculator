import { Typography } from '../../components/Typography';
import { UNIT } from '../../constants/common';
import { EXAMPLE_CASE_RESULT, PDF_BASIC_RESULT } from '../../constants/pdf';
import { REVATION_PLASTIC_TYPE, TABLE_LABEL } from '../../constants/plastic';
import { CalculatedDataType } from '../../types/form';
import { calculatedMarkerPosition } from '../../utils/calculatedMarkerPosition';
import { formatNumber, thousandNumber } from '../../utils/formatNumber';
import { treeConverter } from '../../utils/treeConverter';
import PdfLayout from './PdfLayout';

const SecondPage = ({
  calculatedCarbonData,
}: {
  calculatedCarbonData: CalculatedDataType;
}) => {
  const barDimensions = {
    firstBarSize: 190,
    secondBarSize: 129,
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
    <PdfLayout key="second-pdf">
      <div className="relative flex flex-col px-20">
        <div className="mt-[50px] font-pretendard text-[16px] font-extrabold leading-[22.4px] tracking-[-0.32px] text-[#46564B]">
          신규 개발 제품에 대한 탄소 배출 저감량
        </div>
        <div className="absolute right-0 top-0 h-[98px] w-[14px] bg-[#46564B]" />
        <div className="ml-[40px] mt-[26px] flex gap-[86px]">
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <Typography
                  color="text-primary-600"
                  className="font-pretendard text-[7px] font-medium leading-[9.8px] tracking-[-0.175px]"
                >
                  리베이션 제품 탄소 발생량
                </Typography>
                <Typography
                  color="text-primary-600"
                  className="mt-[3.93px] font-pretendard text-[14px] font-bold leading-[16.8px] tracking-[-0.35px]"
                >
                  {calculatedCarbonData.reductionPercent.toFixed(0)}% 절감
                </Typography>
                <div className="mt-[1.12px] flex items-center gap-[2px]">
                  <Typography
                    color="text-primary-600"
                    className="font-pretendard text-[7px] font-semibold leading-[9.8px] tracking-[-0.14px]"
                  >
                    약 {formatNumber(calculatedCarbonData.reductionData)}
                  </Typography>
                  <Typography
                    color="text-primary-600"
                    className="font-geologica text-[7px] font-medium leading-[9.8px] tracking-[-0.07px]"
                  >
                    {UNIT}
                  </Typography>
                </div>
              </div>
              <svg width={190} height={190}>
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
                  strokeLinecap="round"
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
                  fill="transparent"
                  fillOpacity="0.2"
                  stroke="#BCBCBE"
                  className="z-50"
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
                  strokeLinecap="round"
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
                  fill="transparent"
                  stroke="#91A698"
                  className="z-50"
                  style={{
                    transformOrigin: `${marker2.x}px ${marker2.y}px`,
                  }}
                />
              </svg>
            </div>
          </div>
          <div className="absolute right-[20px] top-[130px] flex flex-col items-end justify-center gap-1">
            <div className="flex w-[269px] flex-col divide-y-[0.4px] divide-primary-600 border-b-[0.4px] border-t-[0.4px] border-primary-600">
              {PDF_BASIC_RESULT.map((item) => (
                <div className="flex h-[22.8px] justify-between px-[7px] py-[6px]">
                  <div className="font-pretendard text-[7.5px] font-medium leading-[10.5px] tracking-[-0.187px] text-primary-600">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-[2px]">
                    <div className="font-pretendard text-[7.5px] font-medium leading-[10.5px] tracking-[-0.187px] text-primary-600">
                      {item.type === 'productWeight' ||
                      item.type === 'productCount'
                        ? thousandNumber(calculatedCarbonData[item.type])
                        : formatNumber(calculatedCarbonData[item.type])}
                    </div>
                    {item.type !== 'basicPlastic' && (
                      <div className="font-geologica text-[7.5px] font-medium leading-[10.5px] tracking-[-0.075px] text-primary-600">
                        {item.unit}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex text-[6px] leading-[8.4px] tracking-[-0.15px] text-primary-600">
              <div className="font-geologica font-normal">
                *LESS PLASTIC SOLUTION
              </div>
              <div className="font-pretendard font-medium">
                으로 편백나무 {treeConverter(calculatedCarbonData)}
                그루 심는 효과가 발생합니다.
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[50px] flex gap-[6px]">
          {REVATION_PLASTIC_TYPE.map((item) => (
            <div className="flex flex-col gap-6">
              <div className="flex h-[65px] flex-1 flex-col items-center border-[0.6px] border-primary-600 py-12">
                <div className="font-geologica text-[7px] font-medium leading-[9.8px] tracking-[-0.07px] text-[#46564B]">
                  {item}
                </div>
                <div className="mt-1 flex items-center">
                  <div className="font-pretendard text-[13px] font-bold leading-[15.6px] tracking-[-0.325px] text-[#46564B]">
                    {formatNumber(
                      calculatedCarbonData.revationCalculatedData[item][3],
                    )}
                  </div>
                  <div className="font-geologica text-[8px] font-semibold leading-[10px] tracking-[-0.08px] text-primary-600">
                    {UNIT}
                  </div>
                </div>
                <div className="text-semibold mt-[2px] font-pretendard text-[7px] leading-[9.8px] tracking-[-0.14px] text-primary-600">
                  {calculatedCarbonData.revationReductionPercent[item].toFixed(
                    0,
                  )}
                  % 절감
                </div>
              </div>
              <div className="flex w-[181px] flex-col divide-y-[0.4px] divide-primary-600 border-b-[0.4px] border-t-[0.4px] border-primary-600">
                {TABLE_LABEL.map((label, idx2) => (
                  <div className="flex h-[22px] items-center justify-between px-[7px] py-[6px]">
                    <div className="font-pretendard text-[7.5px] font-medium leading-[10.5px] tracking-[-0.187px] text-primary-600">
                      {label}
                    </div>
                    <div className="flex gap-[2px]">
                      <div className="font-pretendard text-[7.5px] font-medium leading-[10.5px] tracking-[-0.187px] text-primary-600">
                        {formatNumber(
                          calculatedCarbonData.revationCalculatedData[item][
                            idx2
                          ],
                        )}
                      </div>
                      <div className="font-geologica text-[7.5px] font-medium leading-[10.5px] tracking-[-0.075px] text-primary-600">
                        {UNIT}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-[46px] flex gap-[17px]">
          <div className="flex flex-col gap-[30px]">
            <div className="h-[38px] py-8 font-pretendard text-[16px] font-extrabold leading-[22.4px] tracking-[-0.32px] text-[#46564B]">
              친환경 플라스틱 제품 대표 사례
            </div>
            <div className="flex w-[269px] flex-col divide-y-[0.4px] divide-primary-600 border-b-[0.4px] border-t-[0.4px] border-primary-600">
              {EXAMPLE_CASE_RESULT.map((item) => (
                <div className="flex h-[22px] justify-between px-[7px] py-[6px]">
                  <div className="font-pretendard text-[7.5px] font-medium leading-[10.5px] tracking-[-0.187px] text-[#46564B]">
                    {item.title}
                  </div>
                  <div className="flex items-center gap-[2px]">
                    <div className="font-pretendard text-[7.5px] font-medium leading-[10.5px] tracking-[-0.187px] text-[#46564B]">
                      {item.data}
                    </div>
                    {item.unit !== null && (
                      <div className="font-geologica text-[7.5px] font-medium leading-[10.5px] tracking-[-0.075px] text-[#46564B]">
                        {item.unit}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <img
            className="h-[201px] w-[269px]"
            src="/example_tray.png"
            alt="example image"
          />
        </div>
        <div className="mt-[28.5px] flex w-full flex-1 justify-between">
          <div className="flex gap-[2px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="62"
              height="9"
              viewBox="0 0 62 9"
              fill="none"
            >
              <g clipPath="url(#clip0_4869_7553)">
                <path
                  d="M18.4968 0.679199H20.262L22.6844 6.72637H22.7126L25.1819 0.679199H26.9002L23.5952 8.32071H21.7079L18.4968 0.679199Z"
                  fill="#46564B"
                />
                <path
                  d="M31.022 5.28297L29.576 1.99995H29.5385L28.0738 5.28297L27.6137 6.30184L26.7029 8.32071H24.9565L28.6653 0.679199H30.468L34.1955 8.32071H32.3834L31.4727 6.30184L31.022 5.28297Z"
                  fill="#46564B"
                />
                <path
                  d="M41.0121 0.679199H42.7021V8.32071H41.0121V0.679199Z"
                  fill="#46564B"
                />
                <path
                  d="M48.0915 0.5C49.5469 0.5 50.6829 0.896226 51.4998 1.67925C52.3167 2.4717 52.7298 3.40566 52.7298 4.5C52.7298 5.59434 52.3167 6.5283 51.4998 7.32076C50.6829 8.11321 49.5469 8.5 48.0915 8.5C46.6362 8.5 45.5095 8.10377 44.6926 7.32076C43.8664 6.5283 43.4626 5.59434 43.4626 4.5C43.4626 3.40566 43.8758 2.4717 44.6926 1.67925C45.5189 0.886792 46.6456 0.5 48.0915 0.5ZM48.0915 1.59434C47.0493 1.59434 46.3076 1.89623 45.8381 2.5C45.378 3.10377 45.1433 3.77359 45.1433 4.50943C45.1433 5.24528 45.378 5.91509 45.8381 6.51887C46.2982 7.12264 47.0493 7.42453 48.0915 7.42453C49.1337 7.42453 49.8755 7.12264 50.3449 6.51887C50.805 5.91509 51.0397 5.24528 51.0397 4.50943C51.0397 3.77359 50.805 3.10377 50.3449 2.5C49.8849 1.89623 49.1337 1.59434 48.0915 1.59434Z"
                  fill="#46564B"
                />
                <path
                  d="M53.556 0.679199H55.34L59.7529 6.30184H59.7811V0.679199H61.396V8.32071H59.6121L55.2085 2.7075H55.171V8.32071H53.556V0.679199Z"
                  fill="#46564B"
                />
                <path
                  d="M0 8.32071V3.7358H6.3471C6.53489 3.7358 6.70389 3.66033 6.84473 3.51882C6.98557 3.36788 7.05129 3.18863 7.05129 2.97165V2.2075H1.40838C1.01403 2.2075 0.676023 2.05656 0.403736 1.7641C0.131449 1.46222 0 1.10373 0 0.679199H8.46906V3.7358C8.46906 4.16977 8.32823 4.52826 8.04655 4.82071C7.76487 5.11316 7.43625 5.26411 7.05129 5.26411H5.64291L8.46906 8.32071H6.3471L3.52095 5.26411H1.40838V8.32071H0Z"
                  fill="#46564B"
                />
                <path
                  d="M40.1576 0.679199H32.0078C32.0078 1.07543 32.1393 1.42448 32.4115 1.7075C32.6838 1.99052 33.0218 2.1226 33.4162 2.1226H35.3879V8.31128H37.078V2.13203H39.0591C39.4441 2.13203 39.7727 1.99052 40.0544 1.71694C40.336 1.43392 40.4769 1.09429 40.4769 0.688633H40.1576V0.679199Z"
                  fill="#46564B"
                />
                <path
                  d="M11.5113 6.74522C11.3141 6.74522 11.1451 6.66975 11.0042 6.50937C10.8728 6.35843 10.8071 6.16975 10.8071 5.9622V5.34899C10.8071 5.34899 10.8259 5.34899 10.8352 5.34899H16.403C16.7974 5.34899 17.1354 5.19805 17.4171 4.89616C17.6987 4.59427 17.849 4.22635 17.849 3.78295H10.8165V2.9905C10.8165 2.78295 10.8822 2.59428 11.0136 2.44333C11.1545 2.29239 11.3235 2.21692 11.5207 2.21692H12.0277C12.0277 2.21692 12.0277 2.21692 12.0371 2.21692H16.4312C16.8256 2.21692 17.1636 2.06597 17.4452 1.76409C17.7269 1.4622 17.8771 1.09428 17.8771 0.650879H10.8165C10.4221 0.650879 10.0935 0.801822 9.81182 1.11314C9.53953 1.41503 9.40808 1.78295 9.40808 2.20748V6.72635C9.40808 7.16031 9.53953 7.52824 9.81182 7.83012C10.0278 8.06597 10.2813 8.20748 10.5723 8.25465C10.6005 8.25465 10.6193 8.25465 10.6475 8.26409C10.6568 8.26409 10.6662 8.26409 10.685 8.26409C10.732 8.26409 10.7695 8.26409 10.8165 8.26409H16.4594C16.8443 8.26409 17.173 8.11314 17.4546 7.81126C17.7363 7.50937 17.8771 7.14144 17.8771 6.70748H11.53L11.5113 6.74522Z"
                  fill="#46564B"
                />
              </g>
              <defs>
                <clipPath id="clip0_4869_7553">
                  <rect
                    width="61.4054"
                    height="8"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <div className="font-geologica text-[6.5px] leading-[9.1px] tracking-[-0.162px] text-primary-600">
              Copyright 2024. Revation Co., Ltd. All Rights Reserved.
            </div>
          </div>
          <div className="font-geologica text-[6.5px] tracking-[-0.162px] text-primary-600">
            02
          </div>
        </div>
      </div>
    </PdfLayout>
  );
};

export default SecondPage;
