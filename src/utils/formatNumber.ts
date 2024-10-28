export const formatNumber = (num: number) => {
  if (num >= 1000000) return '999999.99';
  return (Math.round(num * 100) / 100).toLocaleString('en-US');
};
