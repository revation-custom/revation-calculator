import saveAs from 'file-saver';
import { updatePdf } from '../useCase/updatePdf';
import { ReactNode } from 'react';

export const downloadHtmlAsPDF = async (
  fileName: string,
  components: ReactNode[],
  startFunc: () => void,
  endFunc: () => void,
) => {
  startFunc();
  const { newPdfDoc } = await updatePdf(components);
  const pdfBytes = await newPdfDoc.save();

  saveAs(new Blob([pdfBytes]), `${fileName}.pdf`);
  endFunc();
};
