export const calculatedMarkerPosition = (
  progress: number,
  center: number,
  radius: number,
) => {
  const angle = (progress / 100) * 2 * Math.PI - Math.PI / 2; // Start at the top (12 o'clock)
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle),
  };
};
