
// Calculate width of bootstrap grid col
export const getColWidth = () => {
  const containerWidth = document.getElementById('form-preview').offsetWidth;
  const colWidth = containerWidth / 12;
  return colWidth;
};

// Returns min width for field (2 col)
export const getFieldMinWidth = () => {
  return getColWidth() * 2;
};
