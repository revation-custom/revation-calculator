import html2canvas from 'html2canvas';
import { ReactNode } from 'react';
import { renderToString } from 'react-dom/server';

export const createDynamicPageImage = async (
  component: ReactNode,
  width: number,
  height: number,
) => {
  const componentHtml = renderToString(component);
  const container = document.createElement('div');
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
  container.style.backgroundColor = '#ffffff';
  container.style.position = 'fixed';
  container.style.zIndex = '-1';
  container.innerHTML = componentHtml;
  document.body.appendChild(container); // 임시로 HTML 요소 추가
  const scale = 8;

  // html2canvas로 HTML을 캡처하여 이미지로 변환
  const canvas = await html2canvas(container, {
    width: width,
    height: height,
    scale: scale,
  });
  const imageDataUrl = canvas.toDataURL('image/png');
  document.body.removeChild(container); // 임시 요소 제거

  return imageDataUrl;
};
