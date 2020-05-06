// Constants and utils
import {FIRST_ARRAY_ELEMENT_INDEX} from '../constants/common';

export const convertArrayToMapByID = (array) => {
  return array.reduce((map, item) => {
    const {id} = item;

    if (!id) {
      return map;
    }

    map[item.id] = item;

    return map;
  }, {});
};

export const convertMapToArray = (map) => {
  if (!map) {
    return [];
  }

  return Object.values(map);
};

export const cloneObject = (object, shouldUsePrototype = false) => {
  let clonedObject = Object.assign({}, object);

  if (shouldUsePrototype) {
    clonedObject = Object.create(object);

    for (let key in object) {
      if (object.hasOwnProperty(key)) {
        clonedObject[key] = object[key];
      }
    }
  }

  return clonedObject;
};

export const mergeObjects = (...args) => {
  const objects = typeof args[args.length - 1] === `boolean` ? args.slice(0, -1) : args;
  const shouldUsePrototype = typeof args[args.length - 1] === `boolean` ? args[args.length - 1] : false;

  let mergedObject = objects.reduce((tempMergedObject, object) => Object.assign(tempMergedObject, object), {});

  if (shouldUsePrototype) {
    const prototype = objects[FIRST_ARRAY_ELEMENT_INDEX];

    const mergedObjectWithProto = Object.create(prototype);

    for (let key in mergedObject) {
      if (mergedObject.hasOwnProperty(key)) {
        mergedObjectWithProto[key] = mergedObject[key];
      }
    }

    return mergedObjectWithProto;
  }

  return mergedObject;
};
