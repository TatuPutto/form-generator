export const push = (array, items) => {
  console.log('@push', array);
  if (Array.isArray(items)) {
    return array.concat(items);
  } else {
    return array.concat([items]);
  }
};

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
      id: id
    };
  });
};

export const objectFrom = (array = []) => {
  if (!array.length) {
    return {};
  }

  const object = array.reduce((obj, item) => {
    return obj[item.id] = item;
  }, {});
  console.log('object', object);
  return object;
};

export const set = (obj = {}, path, value, depth = 0) => {
  if (Array.isArray(path)) {
    if (path.length > 1) {
      if (depth < path.length - 1) {
        if (depth === 0) {
          return {
            ...obj,
            [path[depth]]: set(obj[path[depth]], path, value, depth + 1)
          };
        } else {
          return {
            ...obj[path[depth]],
            [path[depth + 1]]: set(obj[path[(depth + 1)]], path, value, depth + 1)
          };
        }
      } else {
        return { ...obj, [path[depth]]: value };
      }
    } else {
      return { ...obj, [path[depth]]: value };
    }
  } else {
    return { ...obj, [path]: value };
  }
};
