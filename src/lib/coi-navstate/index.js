import { COI_TENANT } from 'LIB/coi-path/path-config';
import { navStateApiPath } from 'LIB/coi-path/api';
import { urlParamToObject } from 'LIB/coi-util/path'
import { handleGETRequest } from 'LIB/coi-util/network';

/**
 * Returns an object with redirect url and email address
 *
 * @param{string} tenant  user's tenant value
 * @param{string} token   navigation state id
 * @returns{Object}       Object with redirectUrl and emailAddress
 */
async function fetchUrl(tenant, token) {
  try {
    const urlParam = urlParamToObject();
    const { status, payload } = await handleGETRequest(navStateApiPath('nav state id', { navStateId: token }));

    if (status >= 200 && status < 300) {
      const { state = {} } = payload;
      const {
        discovery_url, email = urlParam.email, issuer, offline_url, redirect_uri
      } = state;
      let redirectUrl;

      if (discovery_url) {
        redirectUrl = discovery_url;
      } else if (offline_url) {
        redirectUrl = offline_url;
      } else {
        redirectUrl = redirect_uri;
      }

      return {
        email: email || '', isDiscovery: (discovery_url), redirectUrl, issuer
      };
    }

  } catch (error) {
    console.error(error);
  }
}

/**
 * Returns a promise for an object with redirectUrl, issuerUrl, and email
 * for a navStateId query parameter
 *
 * @param{string} token  navigation state id
 * @returns {Promise} Promise for an object with redirectUrl, issuer, email
 */
const getNavState = ({ navStateId, tenant = COI_TENANT } = {}) => {
  try {
    if (navStateId) {
      return fetchUrl(tenant, navStateId);
    }

    const urlParam = urlParamToObject();
    if (urlParam.navStateId) {
      return fetchUrl(tenant, urlParam.navStateId);
    }

    return null;

  } catch (error) {
    console.error(error);
  }
};

export default getNavState;
