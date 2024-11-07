export const existPdfBytes = async (url: string) => {
  const resData = await fetch(url).then((res) => res.arrayBuffer());

  return resData;
};
