/*
 * @desc: add a list of items to array at the specified index
 */
export const insertAt = (index, source = [], addition = []) => {
  try {
    const itemsBeforeIndex = source.slice(0, index);
    const itemsAfterIndex = source.slice(index);

    return [
      ...itemsBeforeIndex, ...addition, ...itemsAfterIndex
    ];

  } catch (error) {
    console.error(error);
  }
};

/*
 * @desc: remove array item at the specified index
 */
export const removeAt = (index, source = []) => {
  try {
    return [
      ...source.slice(0, index),
      ...source.slice(index + 1)
    ];

  } catch (error) {
    console.error(error);
  }
};

/*
 * @desc: replace array item at the specified index
 */
export const replaceAt = (index, source = [], replacement) => {
  try {
    return [
      ...source.slice(0, index),
      replacement,
      ...source.slice(index + 1)
    ];

  } catch (error) {
    console.error(error);
  }
};

/**
 * @desc: helper method used in Array.prototype.sort() to sort all types
 * @param: $direction - asc | des [default: asc]
 * @return: (direction) => {}
 * @usage: > [5,1,8,9,13,4].sort(arrSort())
 *         < [1, 4, 5, 8, 9, 13]
 */
export const sortAll = (direction = 'asc') => {
  return (direction === 'des') ?
    (A, B) => +(A < B) || +(A === B) - 1 :
    (A, B) => +(A > B) || +(A === B) - 1;
};

/**
 * @desc: helper method used with Array.prototype.sort() to sort object
 * @param: $attr - the key/attribute of the object to sort by
 *         $direction - asc | des [default: asc]
 * @return: (attr, direction) => {}
 * @usage: [{a:10}, {a:1}, {a:5}, {a:4}].sort(arrSortObject('a'))
 *         < [{a:1}, {a:4}, {a:5}, {a:10}]
 */
export const sortObject = (attr, direction = 'asc') => {
  return (direction === 'des') ?
    (A, B) => +(A[attr] < B[attr]) || +(A[attr] === B[attr]) - 1 :
    (A, B) => +(A[attr] > B[attr]) || +(A[attr] === B[attr]) - 1;
};
