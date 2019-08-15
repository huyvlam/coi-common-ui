import { urlParamToObject } from 'LIB/coi-util/path';

const { hostname, pathname } = window && window.location;

export const COI_TENANT = pathname.replace(/.+tenants\//ig, '').replace(/\/.+/, '');

export const COI_CLIENT = pathname.replace(/-ui\/.+|-ui?\//ig, '-ui').replace(/.+\//ig, '');

export const COI_VERSION = pathname.replace(/.+(?=v\d\.\d\/)/ig, '').replace(/\/.+/ig, '');

export const COI_LOCALE_QUERY = (() => {
  const { ui_locale } = urlParamToObject();
  return ui_locale;
})();

export const API_ENV = (() => {
  if (hostname === 'identity.cisco.com') {return '';}
  if (/int-/i.test(hostname)) {return 'int-';}
  if (/stg-|dev-|localhost/i.test(hostname)) {return 'stg-';}
})();
