import { COI_LOCALE } from 'LIB/coi-locale';
import { COI_CLIENT, COI_TENANT } from 'LIB/coi-path/path-config';
import { globalScopes, tenantScopes } from 'LIB/coi-scope';
import { authenticationApiPath } from 'LIB/coi-path/api';
import { getRedirectUrl } from 'LIB/coi-redirect';

/**
 * @desc: Determine the authentication scope based on tenancy
 */
const scopes = (COI_TENANT === 'global' || COI_TENANT === 'cisco') ? globalScopes : tenantScopes;

/**
 * @desc: request redirect url from coi-redirect
 */
let REDIRECT_URL = '';
(async function parseRedirectUri() {
  const { redirectUrl } = await getRedirectUrl();
  REDIRECT_URL = redirectUrl;
}());

/**
 * @desc: handle WebSDK initialization and its following actions:
 *        1. if user already has keycloak session (WebSDK has been initialized)
 *          -> return data from keycloak authentication
 *        2. if user does not have keycloak session (WebSDK has not been initialized)
 *          -> use keycloak to login user
 */
let KEYCLOAK = null;
const handleInitSDK = (kcAuthenticated, keycloak, redirectUrl) => {
  if (!keycloak) {
    throw 'WebSDK is missing keycloak';
  }
  KEYCLOAK = keycloak;

  if (kcAuthenticated) {
    return handleAfterLogin();
  }

  return handleLogin(redirectUrl);
};

/**
 * @desc: set the pending value to T/F
 */
let PENDING = false;
const togglePending = (bool) => {
  PENDING = bool;
};

/**
 * @desc: handle user login using WebSDK keycloak
 */
const handleLogin = ({redirectUrl}) => {
  if (!KEYCLOAK || PENDING) return;

  togglePending(true);
  KEYCLOAK.login({
    scopes, redirectUri: redirectUrl, locale: COI_LOCALE
  });
};

/**
 * @desc: provide certificate for jsonwebtoken service. The certificate can be used to verify the token (ex: jsonwebtoken.verify(getAccessToken(), certificate)
 */
const getJWTCertificate = async () => {
  const url = authenticationApiPath('access management');
  const response = await fetch(url);
  const {public_key = ''} = response.data
  return `-----BEGIN PUBLIC KEY-----\n${public_key}\n-----END PUBLIC KEY-----`
};

/**
 * @desc: manually set a timer to expire keycloak session after 20 minutes
 */
const AUTH_SESSION_DURATION = 20 * 60 * 1000;
let sessionTimer = null;

const setAuthenticationTimeout = (duration = AUTH_SESSION_DURATION) => {
  if (!sessionTimer) {
    sessionTimer = setTimeout(() => {
      clearAuthenticationTimeout();
    }, duration);
  }
};
const clearAuthenticationTimeout = (session = sessionTimer) => {
  if (session) {
    clearTimeout(session);
    sessionTimer = null;
  }
};

/**
 * @desc: clear session timer and log user out using WebSDK keycloak
 * @param {redirectUrl}: where to take user after logout
 */
const logout = (redirectUrl = window.location.href) => {
  clearTimeout(sessionTimer);
  sessionTimer = null;
  KEYCLOAK.logout({redirectUri: redirectUrl});
};

/**
 * @desc: Publish certain keycloak properties and methods
 */
const parseKeycloak = () => {
  const { kcauthenticated, getAccessToken, scopes } = KEYCLOAK;

  return {
    getAccessToken, getJWTCertificate, logout,
    authenticated: kcauthenticated,
    scopes: scopes.scopeArray,
    setAuthDuration: duration => setAuthenticationTimeout(duration),
    clearAuthDuration: () => clearAuthenticationTimeout()
  };
};

/**
 * @desc: handle actions followed by successfull keycloak login
 */
const handleAfterLogin = () => {
  togglePending(false);
  setAuthenticationTimeout();
  return parseKeycloak();
}

/**
 * @desc: this method serves as a wrapper that handle all WebSDK operation in context of the application
 *
 */
const iFrameSubdomain = window.location.origin;
const iframePath = `${iFrameSubdomain}/ux-app/iframe.html`;
let WebSDK = null, SDK = null;

const authenticate = ({ oneidentity, redirectUrl = REDIRECT_URL } = {}) => {
  if ((!oneidentity || !oneidentity.default) && (!window.oneidentity || !window.oneidentity.default)) {
    throw 'WebSDK is not detected in the browser. You should check the global object for \"window.oneidentity\" and manually pass it as an init argument';
  }
  WebSDK = (oneidentity && oneidentity.default) || (window.oneidentity && window.oneidentity.default);

  if (SDK || KEYCLOAK) {
    return handleAfterLogin();
  }

  SDK = new WebSDK({
    realm: COI_TENANT,
    client: COI_CLIENT,
    enableOIDCSessionMngmt: true,
    onInitCallback: (kcAuthenticated, keycloak) => {
      return handleInitSDK(kcAuthenticated, keycloak, redirectUrl);
    },
    iFrameSubdomain, iframePath, scopes
  });
};

export default authenticate;
