import getNavState from 'LIB/coi-navstate';
import browserPath from 'LIB/coi-path/browser';
import { idpApiPath } from 'LIB/coi-path/api';
import { urlParamToObject } from 'LIB/coi-util/path'
import { createKeycloakRequest } from 'LIB/coi-util/keycloak';
import { COI_CLIENT, COI_TENANT, COI_VERSION } from 'LIB/coi-path/path-config';

/**
 * @desc: create redirectUrl based on COI_CLIENT, COI_TENANT, COI_VERSION in case navstate does not provide one
 */
const createRedirectUrl = ({ tenant = COI_TENANT, client = COI_CLIENT } = {}) => {
  const uiClient = (client === 'tenancy' || client === 'offering') ? client : 'profile';

  return `${window.location.origin}/ui/tenants/${tenant}/${COI_VERSION}/${uiClient}-ui`;
};

/**
 * @desc check navstate for redirect url, if nav state is not provided, create a default redirect url
 * @param{string} tenant      user tenant
 * @return {promise} a promise which will be resolved with { redirectUrl, ...rest }
 */
export async function getRedirectUrl({ tenant = COI_TENANT } = {}) {
  try {
    const navState = await getNavState({tenant});

    if (navState === null) {
      return { redirectUrl: createRedirectUrl() };
    }

    const {
      redirectUrl = createRedirectUrl(), ...rest
    } = navState;
    return {redirectUrl, ...rest};

  } catch(error) {
    console.error(error);
  }
}

/**
 * @desc: check navstate for "isDiscovery"
 *        if true -> return url for IDP discovery
 *        if false ->  return default signin url
 */
export async function getSigninUrl({ client = COI_CLIENT } = {}) {
  const { isDiscovery, redirectUrl } = await getRedirectUrl();
  const { email } = urlParamToObject();

  if (isDiscovery || client === 'enrollment-ui') {
    const keycloakReq = createKeycloakRequest({redirectUrl});
    return idpApiPath('base', { ...keycloakReq, ...email });
  }

  return redirectUrl;
}

/**
 * @desc: redirect page to specified url
 * @param: [refreshPage] to redirect using window.history.pushState, set refreshPage = false
 */
export const redirectTo = ({ url, errorCode }) => {
  try {
    if (url && url.constructor === String) {
      window.location.href = url;
    } else if (errorCode && errorCode.constructor === Number) {
      window.location.href = `${window.location.href}/error${errorCode}`;
    }

  } catch(error) {
    console.error(error);
  }
};

export async function redirectToExternalIDP ({ tenant }) {
  try {
    const { isDiscovery, redirectUrl } = await getRedirectUrl({tenant});

    if (isDiscovery) {
      redirectTo({ url: redirectUrl });
    } else {
      redirectTo({ url: browserPath('profile', {tenant}) });
    }

  } catch(error) {
    console.error(error);
  }
}
