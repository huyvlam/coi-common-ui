import { browserPathToClient } from './browser-base';

export const browserPathToContact = ({ tenant, client } = {}) => {
  return `${browserPathToClient({ tenant, client })}/contact-us`;
};

export const browserPathToEnrollment = ({ tenant } = {}) => {
  return `${browserPathToClient({ tenant, client: 'enrollment-ui' })}`;
};

export const browserPathToProfile = ({ tenant } = {}) => {
  return `${browserPathToClient({ tenant, client: 'profile-ui' })}`;
};

export const browserPathToProfileWorkflow = ({ tenant, workflow } = {}) => {
  return `${browserPathToProfile({ tenant })}/${workflow}`;
};
