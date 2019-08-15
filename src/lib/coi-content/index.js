import { COI_LOCALE } from 'LIB/coi-locale'
import {
  LOCALE_NAME_AR_SA, LOCALE_NAME_CS_CZ, LOCALE_NAME_DE_DE, LOCALE_NAME_EN_US, LOCALE_NAME_ES_CO, LOCALE_NAME_ES_ES, LOCALE_NAME_FR_CA, LOCALE_NAME_FR_FR, LOCALE_NAME_IT_IT,
  LOCALE_NAME_JA_JP, LOCALE_NAME_KO_KR, LOCALE_NAME_PL_PL, LOCALE_NAME_PT_BR, LOCALE_NAME_RU_RU, LOCALE_NAME_TH_TH, LOCALE_NAME_TR_TR, LOCALE_NAME_VI_VN, LOCALE_NAME_ZH_CN, LOCALE_NAME_ZH_TW
} from 'LIB/coi-locale/locale-name';

import AR_SA_CONTENT from './ar-sa/ar-sa-content';
import CS_CZ_CONTENT from './cs-cz/cs-cz-content';
import DE_DE_CONTENT from './de-de/de-de-content';
import EN_US_CONTENT from './en-us/en-us-content';
import ES_CO_CONTENT from './es-co/es-co-content';
import ES_ES_CONTENT from './es-es/es-es-content';
import FR_CA_CONTENT from './fr-ca/fr-ca-content';
import FR_FR_CONTENT from './fr-fr/fr-fr-content';
import IT_IT_CONTENT from './it-it/it-it-content';
import JA_JP_CONTENT from './ja-jp/ja-jp-content';
import KO_KR_CONTENT from './ko-kr/ko-kr-content';
import PL_PL_CONTENT from './pl-pl/pl-pl-content';
import PT_BR_CONTENT from './pt-br/pt-br-content';
import RU_RU_CONTENT from './ru-ru/ru-ru-content';
import TH_TH_CONTENT from './th-th/th-th-content';
import TR_TR_CONTENT from './tr-tr/tr-tr-content';
import VI_VN_CONTENT from './vi-vn/vi-vn-content';
import ZH_CN_CONTENT from './zh-cn/zh-cn-content';
import ZH_TW_CONTENT from './zh-tw/zh-tw-content';

/**
 * @desc: add your newly created shared/app content in getContent method
 */
export default function getContent(name) {
  try {
    const {
      BUTTON_LABEL,
      CONSENT,
      CONTACT,
      COUNTRY_LABEL,
      EMAIL,
      ERROR,
      INPUT_DESC,
      INPUT_LABEL,
      INPUT_PLACEHOLDER,
      LINK,
      // SHARED content goes ABOVE
      // APP specific content goes BELOW
      ENROLLMENT_APP,
      PROFILE_APP,
      RECOVERY_APP,
      ULM_APP
    } = mergeContent();

    switch(name) {
      case 'button label':
        return BUTTON_LABEL;

      case 'consent':
        return CONSENT;

      case 'contact':
        return CONTACT;

      case 'country label':
        return COUNTRY_LABEL;

      case 'email':
        return EMAIL;

      case 'error':
        return ERROR;

      case 'input desc':
        return INPUT_DESC;

      case 'input label':
        return INPUT_LABEL;

      case 'input placeholder':
        return INPUT_PLACEHOLDER;

      case 'link':
        return LINK;

      case 'enrollment app':
        return ENROLLMENT_APP;

      case 'profile app':
        return PROFILE_APP;

      case 'recovery app':
        return RECOVERY_APP;

      case 'ulm app':
        return ULM_APP;

      default:
        return null;
    }

  } catch(error) {
    console.error(error);
  }
}

function loadContent(locale = COI_LOCALE) {
  switch(locale) {
    case LOCALE_NAME_AR_SA:
      return AR_SA_CONTENT;

    case LOCALE_NAME_CS_CZ:
      return CS_CZ_CONTENT;

    case LOCALE_NAME_DE_DE:
      return DE_DE_CONTENT;

    case LOCALE_NAME_ES_CO:
      return ES_CO_CONTENT;

    case LOCALE_NAME_ES_ES:
      return ES_ES_CONTENT;

    case LOCALE_NAME_FR_CA:
      return FR_CA_CONTENT;

    case LOCALE_NAME_FR_FR:
      return FR_FR_CONTENT;

    case LOCALE_NAME_IT_IT:
      return IT_IT_CONTENT;

    case LOCALE_NAME_JA_JP:
      return JA_JP_CONTENT;

    case LOCALE_NAME_KO_KR:
      return KO_KR_CONTENT;

    case LOCALE_NAME_PL_PL:
      return PL_PL_CONTENT;

    case LOCALE_NAME_PT_BR:
      return PT_BR_CONTENT;

    case LOCALE_NAME_RU_RU:
      return RU_RU_CONTENT;

    case LOCALE_NAME_TH_TH:
      return TH_TH_CONTENT;

    case LOCALE_NAME_TR_TR:
      return TR_TR_CONTENT;

    case LOCALE_NAME_VI_VN:
      return VI_VN_CONTENT;

    case LOCALE_NAME_ZH_CN:
      return ZH_CN_CONTENT;

    case LOCALE_NAME_ZH_TW:
      return ZH_TW_CONTENT;

    case LOCALE_NAME_EN_US:
    default:
      return EN_US_CONTENT;
  }
}

/**
 * @desc: Merge localized content with en_us
 *        Using en_us content as default in case new localized content is not yet translated
 * @output: appContent
 */
function mergeContent() {
  const base = EN_US_CONTENT;
  const sections = Object.keys(base);
  const translated = loadContent(COI_LOCALE);
  const content = Object.create({})

  sections.forEach(section => {
    Object.defineProperty(content, section, {
      value: { ...base[section], ...translated[section] },
      enumerable: true,
      writable: false
    })
  });

  return content;
}
