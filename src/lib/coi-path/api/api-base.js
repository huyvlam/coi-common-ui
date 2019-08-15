import { COI_CLIENT, COI_TENANT, API_ENV } from 'LIB/coi-path/path-config';
import {
  apiUrl, consulVersion, recoveryVersion, idpEndpointBaseUri, authEndpointBaseUri
} from './consul.config.json';

const addPrefix = (url = '', env = API_ENV) => {
  return `https://${env}${url}`;
}

export const apiBasePath = ({ env } = {}) => {
  return addPrefix(apiUrl, env);
};

export const apiPathToTenant = ({ env, tenant = COI_TENANT } = {}) => {
  return `${apiBasePath({env})}/tenants/${tenant}`;
};

export const apiPathToTenantVersion = ({ env, tenant } = {}) => {
  return `${apiPathToTenant({env, tenant})}/${consulVersion}`;
};

export const apiPathToClient = ({ env, tenant, client = COI_CLIENT } = {}) => {
  return `${apiPathToTenantVersion({ env, tenant })}/${client}`;
};

export const apiPathToNonTenantVersion = ({ env = API_ENV } = {}) => {
  return `${apiBasePath({env})}/${recoveryVersion}`;
};

export const authBasePath = () => {
  return authEndpointBaseUri;
};

export const idpBasePath = () => {
  return idpEndpointBaseUri;
};

export const apiPath = (type, options) => {
  if (!type) {
    throw Error('missing required argument - type');
  }

  if (type === 'base') {return apiBasePath(options);}
  if (type === 'tenant') {return apiPathToTenant(options);}
  if (type === 'version') {return apiPathToTenantVersion(options);}
  if (type === 'client') {return apiPathToClient(options);}
  if (type === 'non tenant') {return apiPathToNonTenantVersion(options);}
  if (type === 'auth endpoint') {return authBasePath();}
  if (type === 'idp endpoint') {return idpBasePath();}
};
