import {FIRST_ARRAY_ELEMENT_INDEX} from '../constants/common';

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

export const cloneObject = (object, shouldUsePrototype = false) => {
  const clonedObject = Object.assign({}, object);

  if (shouldUsePrototype) {
    // eslint-disable-next-line no-proto
    clonedObject.__proto__ = object.__proto__;
  }

  return clonedObject;
};

export const mergeObjects = (...args) => {
  const objects = typeof args[args.length - 1] === `boolean` ? args.slice(0, -1) : args;
  const shouldUsePrototype = typeof args[args.length - 1] === `boolean` ? args[args.length - 1] : false;

  const mergedObject = objects.reduce((tempMergedObject, object) => Object.assign(tempMergedObject, object), {});

  if (shouldUsePrototype) {
    // eslint-disable-next-line no-proto
    mergedObject.__proto__ = objects[FIRST_ARRAY_ELEMENT_INDEX].__proto__;
  }

  return mergedObject;
};
