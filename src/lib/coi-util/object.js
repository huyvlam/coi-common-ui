export function isEmpty(obj) {
  try {
    return !Object.keys(obj).length;
  } catch (error) {
    console.error(error);
  }
}

export function containsKey(obj, key) {
  try {
    return Object.prototype.hasOwnProperty.call(obj, key);
  } catch (error) {
    console.error(error);
  }
}
