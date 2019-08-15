import { COI_TENANT } from 'LIB/coi-path/path-config';
import { authBasePath } from './api-base';
import { keyCloakVersion } from './consul.config.json';

const apiPathToAuth = () => {
  return `${authBasePath()}api`;
};

const apiPathToAuthTenant = ({ tenant = COI_TENANT } = {}) => {
  return `${apiPathToAuth()}/tenants/${tenant}`;
};

const apiPathToAuthTenantVersion = ({ tenant } = {}) => {
  return `${apiPathToAuthTenant({tenant})}/${keyCloakVersion}`;
};

const apiPathToManageAccess = ({ tenant } = {}) => {
  return `${apiPathToAuthTenantVersion({tenant})}/am`;
};

const apiPathToProtocol = ({ tenant }) => {
  return `${apiPathToManageAccess({tenant})}/protocol`;
};

const apiPathToOpenConnect = ({ tenant }) => {
  return `${apiPathToProtocol({tenant})}/openid-connect`;
};

const apiPathToOpenAuth = ({ tenant }) => {
  return `${apiPathToOpenConnect({tenant})}/auth`;
};

const apiPathToOpenUserInfo = ({ tenant }) => {
  return `${apiPathToOpenConnect({tenant})}/userinfo`;
};

const apiPathToLogout = ({tenant} = {}) => {
  return `${apiPathToOpenConnect({tenant})}/logout`;
};

const apiPathToOpenToken = ({tenant} = {}) => {
  return `${apiPathToOpenConnect({tenant})}/token`;
};

const apiPathToOpenIntrospect = ({tenant} = {}) => {
  return `${apiPathToOpenToken({tenant})}/introspect`;
};

const authenticationApiPath = (type, options) => {
  if (!type) {
    throw Error('missing required argument - type');
  }

  if (type === 'base') {return authBasePath();}
  if (type === 'auth api') {return apiPathToAuth(options);}
  if (type === 'auth tenant') {return apiPathToAuthTenant(options);}
  if (type === 'auth version') {return apiPathToAuthTenantVersion(options);}
  if (type === 'access management') {return apiPathToManageAccess(options);}
  if (type === 'protocol') {return apiPathToProtocol(options);}
  if (type === 'open connect') {return apiPathToOpenConnect(options);}
  if (type === 'open connect auth') {return apiPathToOpenAuth(options);}
  if (type === 'user info') {return apiPathToOpenUserInfo(options);}
  if (type === 'logout') {return apiPathToLogout(options);}
  if (type === 'token') {return apiPathToOpenToken(options);}
  if (type === 'introspect') {return apiPathToOpenIntrospect(options);}
};

export default authenticationApiPath;
