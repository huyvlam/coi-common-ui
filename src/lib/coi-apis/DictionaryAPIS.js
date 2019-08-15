import 'core-js/stable';
import { COI_LOCALE_INFO } from 'LIB/coi-locale';
import { dictionaryApiPath } from 'LIB/coi-path/api';
import { handleGETRequest } from 'LIB/coi-util/network';

class DictionaryAPIS {
  constructor({ locale, country } = COI_LOCALE_INFO) {
    this.locale = locale;
    this.country = country;
  }

  async getFields(locale = this.locale) {
    return handleGETRequest(dictionaryApiPath('fields', {locale}));
  }

  async getRules(country = this.country) {
    return handleGETRequest(dictionaryApiPath('rulers', {country}));
  }
}

export default DictionaryAPIS;
