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
 */
export const sortObject = (attr, direction = 'asc') => {
  return (direction === 'des') ?
    (A, B) => +(A[attr] < B[attr]) || +(A[attr] === B[attr]) - 1 :
    (A, B) => +(A[attr] > B[attr]) || +(A[attr] === B[attr]) - 1;
};

/** @desc: helper method used with Array.prototype.sort() to localeCompare primitive type or object
 * @param: $locales - unicode extension key for localeCompare
 *         $options - locale object with flags like: sensitivity, caseFirst, etc.
 *         $direction - asc | des [default: asc]
 *         $attr - the key/attribute of the object (* needed only for array of objects)
 * @return: (attr, direction) => {}
 * @usage: ['a', 'BbBb', 'A', 'bBB', 'á'].sort(sortLocaleCompare({
 *           locales: 'kf', options: {sensitivity: 'case'}
           }));
 *         -> ["a", "á", "A", "bBB", "BbBb"]
 */
export const sortLocaleCompare = ({ locales, options = {}, direction = 'asc', attr } = {}) => {
  const areString = (A, B) => ((A).constructor === String && (B).constructor === String);
  const areObject = (A, B) => ((A).constructor === Object && (B).constructor === Object);

  return (direction === 'des') ?
    (A, B) => areObject(A, B) ?
      (B[attr].localeCompare(A[attr], locales, options)) :
      (B).localeCompare(A, locales, options) :
    (A, B) => areObject(A, B) ?
      (A[attr].localeCompare(A[attr], locales, options)) :
      (A).localeCompare(B, locales, options);
};
