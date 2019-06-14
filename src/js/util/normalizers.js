export const normalizeSsn = (value, previousValue) => {
  return value.length <= 11 ? value : previousValue;
};
