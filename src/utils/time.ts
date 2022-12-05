export const numberToTimeObject = (num: number) => {
  return {
    h: Math.floor((num % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    m: Math.floor((num % (1000 * 60 * 60)) / (1000 * 60)),
    s: Math.floor((num % (1000 * 60)) / 1000)
  };
};
