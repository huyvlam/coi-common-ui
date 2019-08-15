/*
 * COI Data Dictionary - Input Validation
 */

import DictionaryCore from 'LIB/coi-dictionary/DictionaryCore';
import {
  VALIDATION_TYPE_CONTAINS, VALIDATION_TYPE_DICT_NAME, VALIDATION_TYPE_EQUAL, VALIDATION_TYPE_UNEQUAL,
  VALIDATION_TYPE_ALL, VALIDATION_TYPE_LENGTH, VALIDATION_TYPE_ONE_OF, VALIDATION_TYPE_REGEX
} from 'LIB/coi-dictionary/metadata/validation-type';
import {
  checkContains, checkDictionaryField, checkEqual, checkUnequal, checkLength, checkRegex, isPrimitive, validateInputList
} from 'LIB/coi-dictionary/util/validation-helper';

class InputValidation extends DictionaryCore {
  constructor({ revisedFields, locale } = {}) {
    super({ revisedFields, locale });
    this.validateList = validateInputList;
  }

  // fetchDictionaryFields()
  // reviseFields()
  // findField()

  validateInput({ pristine, value, validation }) {
    const { required, type, specs } = validation;

    /*
     * @desc: if field is pristine or has no validation info -> skip validation
     * @output: null
     */
    if (pristine || !validation || !type || !specs) {
      return null;
    }

    /*
     * @desc: if field is required but has no value, return status 'empty'
     * @output: object with status, valid
     */
    if (required && !isPrimitive(value)) {
      // Add description and condition check for type "all". This hack is needed to display description list
      const { description } = validation.specs;

      return (type === VALIDATION_TYPE_ALL) ?
        this.iterateAll({ pristine, value, validation }) :
        { status: 'empty', valid: false, description };
    }

    /*
     * @desc: validate input value using validation specs and data dictionary
     */
    const dictField = this.findField(specs.dictField);
    switch(type) {
      case VALIDATION_TYPE_CONTAINS:
        return checkContains(value, { ...dictField, ...specs });

      case VALIDATION_TYPE_DICT_NAME:
        return checkDictionaryField(value, { ...dictField, ...specs })

      case VALIDATION_TYPE_EQUAL:
        return checkEqual(value, { ...dictField, ...specs });

      case VALIDATION_TYPE_UNEQUAL:
        return checkUnequal(value, { ...dictField, ...specs });

      case VALIDATION_TYPE_LENGTH:
        return checkLength(value, { ...dictField, ...specs });

      case VALIDATION_TYPE_ALL:
        return this.iterateAll({ pristine, value, validation });

      case VALIDATION_TYPE_ONE_OF:
        return this.iterate({ pristine, value, validation });

      case VALIDATION_TYPE_REGEX:
        return checkRegex(value.trim(), { ...dictField, ...specs });

      /*
       * @desc: if validation type is not identified -> skip validation
       * @output: null
       */
      default:
        return null;
    }
  }

  /*
   * @desc: Iterate thru the list of validation specs, check and make sure all requirements are met
   * @output: Return object or null
   */
  iterateAll({ value, pristine, validation = {} }) {
    const { all } = validation.specs || {};

    if (!all.length) return null;

    let validCount = 0, statusList = [];

    all.forEach(eachSpec => {
      const eachStatus = this.validateInput({ value, pristine, validation: eachSpec });

      if (!eachStatus) {
        validCount--;
      }

      const { valid } = eachStatus;

      if (valid && validCount < all.length) {
        validCount++;
      }

      if (!valid && validCount > 0) {
        validCount--;
      }

      statusList = [ ...statusList, eachStatus];
    })

    const valid = (validCount === all.length);
    const status = valid ? 'completed' : 'error';

    return {
      status, valid, descriptionList: statusList
    };
  }

  /*
   * @desc: Iterate thru the list of validation specs, if the first requirement is null, move onto next requirement
   *        If any requirement returns an object with validation result, stop and return the validation output
   * @output: Return object or null
   */
  iterate({ value, pristine, validation }) {
    const { specs } = validation;
    const { oneOf } = specs;

    if (!oneOf.length) return null;

    for (let i = 0; i < oneOf.length; i++) {
      const validateField = this.validateInput({
        value, pristine, validation: oneOf[i]
      });

      if (validateField) return validateField;
    }
  }
}

export default InputValidation;
