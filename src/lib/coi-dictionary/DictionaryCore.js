/*
 * COI Data Dictionary - Core
 */

import DictionaryAPIS from 'LIB/coi-apis/DictionaryAPIS';
import revisedDictFields from 'LIB/coi-dictionary/metadata/revised-field';
import { replaceAt } from 'LIB/coi-util/array';
import { COI_LOCALE_INFO } from 'LIB/coi-locale';

const DICT_APIS = new DictionaryAPIS();
const DICT_FIELDS = [];

class DictionaryCore {
  constructor({ revisedFields = revisedDictFields, locale = COI_LOCALE_INFO.locale, country = COI_LOCALE_INFO.country } = {...COI_LOCALE_INFO}) {
    this.locale = locale;
    this.country = country;
    this.revisedFields = revisedFields;
    this.fields = DICT_FIELDS;

    if (this.fields.length) {
      this.reviseFields();
    } else {
      this.fetchDictionaryFields();
    }
  }

  /*
   * @desc: Request data dictionary from API service
   */
  async fetchDictionaryFields() {
    try {
      const { payload } = await DICT_APIS.getFields();

      payload.forEach((field, index) => {
        Object.defineProperty(DICT_FIELDS, index, { value: {...field}, enumerable: true, writable: false });
      });
      this.fields = [...DICT_FIELDS];
      this.reviseFields();

    } catch(error) {
      console.error(error);
    }
  }

  /*
   * @desc: Revise fields from data dictionary
   */
  reviseFields({ revisedFields } = this) {
    revisedFields.forEach(revision => {
      const index = this.fields.findIndex(definition => definition.name === revision.name)

      if (index === -1) {
        this.fields = [...this.fields, revision];
      } else {
        this.fields = replaceAt(index, this.fields, {...this.fields[index], ...revision});
      }
    })
  }

  /*
   * @desc: Find and return definition by name
   */
  findField(fieldName) {
    return this.fields.find(field => field.name === fieldName);
  }
}

export default DictionaryCore;
