/*
 * COI Data Dictionary - Country Address
 */

import DictionaryCore from 'LIB/coi-dictionary/DictionaryCore';

class CountryAddress extends DictionaryCore {
  constructor({ revisedFields, country } = {}) {
    super({ revisedFields, country });
  }

  getFormat(country = this.country) {
    switch(country) {
      default:
        return null;
    }
  }
}

export default CountryAddress;
