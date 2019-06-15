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

export const updateLastItem = (array, key, value) => {
  return array.map((item, i, self) => {
    if (i === self.length - 1) {
      return {
        ...item,
        [key]: value
      };
    } else {
      return item;
    }
  });
};

export const arrayFrom = (obj, order = []) => {
  if (!Object.keys(obj).length) {
    return [];
  }

  if (!order.length) {
    return Object.keys(obj).map(key => {
      return {
        ...obj[key],
        id: key
      };
    });
  }

  return order.map(id => {
    return {
      ...obj[id],
      id: id,
    };
  });
};

// export const setIn = (obj, ) => {
//
// };
