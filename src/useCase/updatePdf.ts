import { PDFDocument } from 'pdf-lib';
import { existPdfBytes } from '../utils/pdfToBytes';
import { ReactNode } from 'react';
import { createDynamicPageImage } from '../utils/createDynamicPageImage';

export const updatePdf = async (components: ReactNode[]) => {
  const originalPdf1 = await existPdfBytes('/original.pdf');

  const pdfDoc = await PDFDocument.load(originalPdf1);
  const newPdfDoc = await PDFDocument.create();

  const [firstPage] = await newPdfDoc.copyPages(pdfDoc, [0]);
  newPdfDoc.addPage(firstPage);

  for (const component of components) {
    const { width, height } = pdfDoc.getPages()[0].getSize(); // 기준 페이지 크기 사용
    const dynamicPage = newPdfDoc.addPage([width, height]); // 각 컴포넌트에 대해 새 페이지 생성
    const dynamicContentImage = await createDynamicPageImage(
      component,
      width,
      height,
    ); // 컴포넌트를 이미지로 변환
    const embeddedImage = await newPdfDoc.embedPng(dynamicContentImage);

    dynamicPage.drawImage(embeddedImage, {
      // 페이지에 이미지 삽입
      x: 0,
      y: 0,
      width: width,
      height: height,
    });
  }

  const [thirdPage, fourthPage] = await newPdfDoc.copyPages(pdfDoc, [2, 3]);

  newPdfDoc.addPage(thirdPage);
  newPdfDoc.addPage(fourthPage);

  return { pdfDoc, newPdfDoc };
};
