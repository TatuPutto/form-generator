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

export const updateActiveField = (array, keyOrCb, value) => {
  if (typeof keyOrCb === 'function') {
    const callback = keyOrCb;
    return array.map(item => {
      if (item.editing) {
        return callback(item);
      } else {
        return item;
      }
    });
  } else {
    const key = keyOrCb;
    return array.map(item => {
      if (item.editing) {
        return {
          ...item,
          [key]: value
        };
      } else {
        return item;
      }
    });
  }
};
