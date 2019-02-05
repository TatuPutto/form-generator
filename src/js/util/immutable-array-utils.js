export const update = (array, id, key, value) => {
  return array.map(item => {
    if (item.id === id) {
      return {
        ...item,
        [key]: value
      };
    } else {
      return item;
    }
  });
};
