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
}

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
}

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
}
