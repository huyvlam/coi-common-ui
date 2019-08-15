import { globalScopes, tenantScopes } from 'LIB/coi-scope';
import { COI_TENANT, COI_CLIENT } from 'LIB/coi-path/path-config';

const DEFAULT_SCOPES = (COI_TENANT === 'global' || COI_TENANT === 'cisco') ? globalScopes : tenantScopes;
const DEFAULT_REQUEST = {
  clientId: COI_CLIENT,
  responseType: 'token',
  scopes: DEFAULT_SCOPES.join(' ')
};

export const createKeycloakRequest = (options = {}) => {
  const {
    clientId, prompt, responseType, redirectUrl, scopes
  } = {...DEFAULT_REQUEST, ...options}

  const request = {
    client_id: encodeURIComponent(clientId),
    response_type: responseType,
    redirect_uri: encodeURIComponent(redirectUrl),
    scopes: encodeURIComponent(scopes)
  };

  return prompt ? {...request, prompt} : {...request};
};
