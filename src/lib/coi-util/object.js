export const isEmpty = (obj) => {
  try {
    return !Object.keys(obj).length;
  } catch (error) {
    console.error(error);
  }
};

export const containsKey = (obj, key) => {
  try {
    return Object.prototype.hasOwnProperty.call(obj, key);
  } catch (error) {
    console.error(error);
  }
};

export const containsValue = (obj, value) => {
  for (let key in obj) {
    if (obj[key] === value) {
      return true;
    }
  }
  return false;
}
