export const padNumber = (num, digits = 3) => {
  return String(num).padStart(digits, "0");
};
