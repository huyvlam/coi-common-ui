import {
  COI_CLIENT, COI_TENANT, COI_VERSION
} from 'LIB/coi-path/path-config';

export const browserBasePath = () => {
  return window.location.origin;
};

export const browserPathToUI = () => {
  return `${browserBasePath()}/ui`;
};

export const browserPathToTenant = ({ tenant = COI_TENANT } = {}) => {
  return `${browserPathToUI()}/tenants/${tenant}`;
};

export const browserPathToVersion = ({ tenant = COI_TENANT } = {}) => {
  return `${browserPathToTenant({tenant})}/${COI_VERSION}`;
};

export const browserPathToClient = ({ tenant = COI_TENANT, client = COI_CLIENT } = {}) => {
  return `${browserPathToVersion({tenant})}/${client}`;
};
