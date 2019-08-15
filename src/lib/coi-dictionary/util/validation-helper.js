import { containsKey } from 'LIB/coi-util/object';

export const removeEdges = (str) => {
  return str.replace(/^\//, '').replace(/\/\w+$/, '')
};

export const isPrimitive = (value) => {
  return (!!value && (value.constructor === String || value.constructor === Number || value.constructor === Boolean))
};

export const checkContains = (value, {contains, cannonicalValues, description}) => {
  const options = (contains) ? contains : cannonicalValues

  if (!isPrimitive(value) || !options) return null

  const query = options.find(item => {
    return (item.constructor === Object) ? item.value.toString() === value.toString() : item.toString() === value.toString()
  })

  return query ?
    {status: 'completed', valid: true, description} :
    {status: 'error', valid: false, description}
};

export const checkEqual = (value, {equal, description}) => {
  const primitive = isPrimitive(value), validEqual = (equal && containsKey(equal, 'value'))

  if (!primitive || !validEqual) return null

  return (primitive && validEqual && value === equal.value) ?
    {status: 'completed', valid: true, description} :
    {status: 'error', valid: false, description}
};

export const checkUnequal = (value, {unequal, description}) => {
  const primitive = isPrimitive(value), validUnequal = (unequal && containsKey(unequal, 'value'))

  if (!primitive || !validUnequal) return null

  return (primitive && validUnequal && value !== unequal.value) ?
    {status: 'completed', valid: true, description} :
    {status: 'error', valid: false, description}
};

export const checkLength = (value, {length, minLength, maxLength, description}) => {
  const primitive = isPrimitive(value)
  if (!primitive || (!length && (!minLength || !maxLength))) return null

  const valueLength = (value).toString().length
  const valid = length ?
    (valueLength === Number(length)) : (valueLength >= Number(minLength) && valueLength <= Number(maxLength))
  const status = valid ? 'completed' : 'error'

  return {status, valid, description}
};

export const checkRegex = (value, {regex, description}) => {
  const primitive = isPrimitive(value)
  if (!primitive || !regex) return null

  const pattern = (regex.constructor === RegExp) ? regex : RegExp(removeEdges(regex), 'g')
  const valid = pattern.test(value)
  const status = valid ? 'completed' : 'error'

  return {status, valid, description}
};

export const checkDictionaryField = (value, {regex, length, minLength, maxLength, description}) => {
  const regexCheck = checkRegex(value, {regex})
  if (regexCheck === null) return null

  const lengthCheck = checkLength(value, {length, minLength, maxLength})
  if (lengthCheck === null) return null

  return (regexCheck.valid && lengthCheck.valid) ?
    {status: 'completed', valid: true, description} :
    {status: 'error', valid: false, description}
};

export const validateInputList = (inputFields = [], excludedNames = []) => {
  for (let i = 0; i < inputFields.length; i++) {
    const { name, value, validation = {}, valid } = inputFields[i];
    const { required } = validation;

    if (excludedNames.includes(name)) {
      continue;
    }

    if ((required && !isPrimitive(value)) || (value && validation && !valid)) {
      return false;
    }
  }

  return true;
};
