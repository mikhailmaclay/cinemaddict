export const reduceArrayToMapByID = (map, item) => {
  const {id} = item;

  if (!id) {
    return map;
  }

  map[item.id] = item;

  return map;
};

export const convertMapToArray = (map) => {
  if (!map) {
    return [];
  }

  return Object.values(map);
};

export const cloneObject = (object) => Object.assign({}, object);

export const mergeObjects = (...objects) => objects.reduce((mergedObject, object) => Object.assign(mergedObject, object), {});
