import { Fragment } from 'react/jsx-runtime';
import { Popup } from '../components/Popup';
import PopupLayout from '../components/Popup/PopupLayout';
import { Typography } from '../components/Typography';
import { LoadingButton } from '../components/LoadingButton';

interface RevationInfoPopupProps {
  label: string;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
export const AGREE_DATA: { title: string; contents: string }[] = [
  {
    title: '목적',
    contents:
      '본 약관은 주식회사 리베이션 (이하 "회사")이 운영하는 웹페이지에서 고객이 자료를 제공받기 위해 회사에 제공하는 개인정보의 수집, 이용, 마케팅 활용에 관한 사항을 규정하는 것을 목적으로 합니다.',
  },
  {
    title: '용어의 정의',
    contents: `본 약관에서 사용하는 용어의 정의는 다음과 같습니다.<br/><br/>
1. "고객"이라 함은 회사의 웹페이지에서 자료를 제공받기 위해 개인정보를 입력한 자를 말합니다.<br/>
2. "개인정보"란 고객이 제공한 회사명, 이름, 이메일 주소, 연락처를 말합니다.<br/>
3. "마케팅 활용"이라 함은 회사가 제공받은 개인정보를 바탕으로 뉴스레터, 홍보 자료 등의 정보 전달 활동을 의미합니다.`,
  },
  {
    title: '개인정보 수집 항목 및 수집 목적',
    contents: `회사는 마케팅 활동을 위해 아래의 개인정보를 수집합니다.
<br/><br/>
1. 수집 항목: 회사명, 이름, 이메일 주소, 연락처<br/>
2. 수집 목적: 고객에게 맞춤형 자료 제공, 뉴스레터 및 홍보 자료 발송 등의 마케팅 활동`,
  },
  {
    title: '개인정보의 이용 및 정보 관리',
    contents: `1. 회사는 수집한 개인정보를 제3조의 목적 달성을 위해 이용하며, 고객의 동의 없이 다른 용도로 사용하지 않습니다.<br/>
2. 회사는 고객의 개인정보를 수집 이후 마케팅 목적 달성 이후 파기하는 것을 원칙으로 하며 단, 고객이
개인정보의 삭제를 요청할 경우 즉시 삭제 처리합니다.`,
  },
  {
    title: '마케팅 활용 동의',
    contents: `1. 고객은 본 약관에 동의함으로써 회사가 제공한 개인정보를 활용하여 마케팅 정보를 수신할 것에 동의합니다.`,
  },
  {
    title: '개인정보의 제3자 제공 및 위탁 처리',
    contents:
      '1. 회사는 고객의 개인정보를 제3자에게 제공하지 않으며, 마케팅 활동을 위해 외부 업체에 위탁하는 경우에도 고객의 동의를 받은 후 처리합니다.',
  },
  {
    title: '허위 정보 기입 시 책임',
    contents: `1. 고객은 본 약관에 따라 정확한 정보를 제공해야 하며, 고의로 허위 정보를 기입할 경우 법적 책임을 질 수 있습니다.<br/>
2. 허위 정보를 제공하여 회사의 자료나 혜택을 부정하게 이용하려는 경우, 이는 형법 제347조에 따른 **사기죄**로 간주될 수 있으며, 이에 대한 형사처벌이 부과될 수 있습니다.<br/>
3. 회사는 허위 정보로 인해 발생한 손해에 대해 민사상 손해배상을 청구할 수 있습니다.`,
  },
  {
    title: '제공된 자료의 이용 제한',
    contents: `1. 고객은 회사가 제공하는 자료를 본인의 정보 수집 목적에 한해 비상업적인 용도로만 사용해야 합니다.<br/>
2. 회사가 제공한 자료의 무단 복제, 배포, 상업적 이용, 또는 제3자에게 제공하는 행위는 엄격히 금지됩니다.<br/>
3. 고객이 본 조항을 위반하여 제공된 자료를 임의로 활용하거나 상업적 목적으로 사용할 경우, 회사는 법적 조치를 취할 수 있으며, 고객은 그에 따른 손해배상을 청구받을 수 있습니다.`,
  },
  {
    title: '고객의 권리 및 행사 방법',
    contents: `1. 고객은 언제든지 본인의 개인정보에 대해 열람, 수정, 삭제를 요청할 수 있습니다.<br/>
2. 개인정보 관련 요청은 고객 서비스 센터 또는 이메일을 통해 접수 가능합니다.`,
  },
  {
    title: '기타 사항',
    contents: `1. 본 약관은 회사의 사정에 따라 변경될 수 있으며, 변경된 약관은 웹페이지를 통해 공지됩니다.`,
  },
];

const PrivacyAgreePopup = ({
  label,
  open,
  onClose,
  onSubmit,
}: RevationInfoPopupProps) => {
  return (
    <Popup
      open={open}
      onClose={onClose}
      isBackdrop={true}
      className="shadow-duplicationBox"
    >
      <PopupLayout key="privacy-info-popup">
        <Popup.Contents>
          <div className="mt-[10px] flex h-full max-h-[663px] w-[calc(100vw-64px)] min-w-[280px] flex-col gap-6 px-24 pb-40 sm:w-[665px] sm:max-w-[665px]">
            <div className="flex flex-col gap-8">
              <Popup.Title>{label}</Popup.Title>
              <div className="h-full max-h-[380px] overflow-y-auto">
                <div className="flex flex-col gap-[18px] overflow-y-auto sm:gap-8">
                  {AGREE_DATA.map((data, idx) => (
                    <div className="flex flex-col gap-2">
                      <div className="body-xs-b text-font sm:title-sm">{`**제${idx + 1}조 (${data.title})**`}</div>
                      <div className="text-font body-2xs sm:title-xs">
                        {data.contents.split('<br/>').map((text) => (
                          <Fragment key={text}>
                            {text}
                            <br />
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Popup.Footer>
            <div className="flex justify-end pb-32 pr-16 sm:pr-24">
              <LoadingButton
                loading={false}
                type="button"
                variant="sm"
                onClick={onSubmit}
              >
                <Typography className="button-but2" color="text-white">
                  동의하기
                </Typography>
              </LoadingButton>
            </div>
          </Popup.Footer>
        </Popup.Contents>
      </PopupLayout>
    </Popup>
  );
};

export default PrivacyAgreePopup;
