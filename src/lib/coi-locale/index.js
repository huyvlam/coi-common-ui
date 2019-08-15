import { urlParamToObject } from 'LIB/coi-util/path';
import { cookieToObject } from 'LIB/coi-util/cookie';
import localeInfoList from 'LIB/coi-locale/locale-info-list';
import {
  LOCALE_NAME_AR_SA, LOCALE_NAME_CS_CZ, LOCALE_NAME_DE_DE, LOCALE_NAME_EN_US, LOCALE_NAME_ES_CO, LOCALE_NAME_ES_ES, LOCALE_NAME_FR_CA, LOCALE_NAME_FR_FR, LOCALE_NAME_IT_IT,
  LOCALE_NAME_JA_JP, LOCALE_NAME_KO_KR, LOCALE_NAME_PL_PL, LOCALE_NAME_PT_BR, LOCALE_NAME_RU_RU, LOCALE_NAME_TH_TH, LOCALE_NAME_TR_TR, LOCALE_NAME_VI_VN, LOCALE_NAME_ZH_CN, LOCALE_NAME_ZH_TW
} from 'LIB/coi-locale/locale-name';

const DEFAULT_LOCALE = LOCALE_NAME_EN_US;

const parseUrlQuery = () => {
  const { ui_locale } = urlParamToObject();
  return ui_locale;
}

const parseCookie = () => {
  const { oneid_locale } = cookieToObject();
  return oneid_locale;
}

const parseWindowNavigator = () => {
  return window.navigator.language;
}

/**
 * @desc: Determine user language locale in the following order:
 *        1. Url query string. (ex: http://identity.com?ui_locale=en_US)
 *        2. Browser cookie
 *        3. Window OS default language
 * @return {string}  Returns locale
 */
const getLocale = () => {
  const ui_locale = parseUrlQuery();
  if (ui_locale) return sanitizeOutput(ui_locale);

  const oneid_locale = parseCookie();
  if (oneid_locale) return sanitizeOutput(oneid_locale);

  const window_navigator = parseWindowNavigator();
  if (window_navigator) return sanitizeOutput(window_navigator);

  return sanitizeOutput(DEFAULT_LOCALE);
}

const sanitizeOutput = (locale) => {
  switch (locale) {
    case 'ar_SA':
    case 'ar-SA':
    case 'ar':
      return LOCALE_NAME_AR_SA;

    case 'cs_CZ':
    case 'cs-CZ':
    case 'cs':
      return LOCALE_NAME_CS_CZ;

    case 'de_DE':
    case 'de-DE':
    case 'de':
      return LOCALE_NAME_DE_DE;

    case 'es_CO':
    case 'es-CO':
      return LOCALE_NAME_ES_CO;

    case 'es_ES':
    case 'es-ES':
    case 'es':
      return LOCALE_NAME_ES_ES;

    case 'fr_CA':
    case 'fr-CA':
      return LOCALE_NAME_FR_CA;

    case 'fr_FR':
    case 'fr-FR':
    case 'fr':
      return LOCALE_NAME_FR_FR;

    case 'it_IT':
    case 'it-IT':
    case 'it':
      return LOCALE_NAME_IT_IT;

    case 'ja_JP':
    case 'ja-JP':
    case 'ja':
      return LOCALE_NAME_JA_JP;

    case 'ko_KR':
    case 'ko-KR':
    case 'ko':
      return LOCALE_NAME_KO_KR;

    case 'pl_PL':
    case 'pl-PL':
    case 'pl':
      return LOCALE_NAME_PL_PL;

    case 'pt_BR':
    case 'pt-BR':
    case 'pt':
      return LOCALE_NAME_PT_BR;

    case 'ru_RU':
    case 'ru-RU':
    case 'ru':
      return LOCALE_NAME_RU_RU;

    case 'th_TH':
    case 'th-TH':
    case 'th':
      return LOCALE_NAME_TH_TH;

    case 'tr_TR':
    case 'tr-TR':
    case 'tr':
      return LOCALE_NAME_TR_TR;

    case 'vi_VN':
    case 'vi-VN':
    case 'vi':
      return LOCALE_NAME_VI_VN;

    case 'zh_CN':
    case 'zh-CN':
    case 'zh':
      return LOCALE_NAME_ZH_CN;

    case 'zh_TW':
    case 'zh-TW':
      return LOCALE_NAME_ZH_TW;

    case 'en_US':
    case 'en-US':
    case 'en':
    default:
      return LOCALE_NAME_EN_US;
  }
}

export const COI_LOCALE = getLocale();
export const COI_LOCALE_INFO = localeInfoList.find(locale => locale.name === COI_LOCALE);
