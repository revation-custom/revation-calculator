export const firstWordSplit = (text: string) => {
  return text.split(/[ (]/)[0];
};
