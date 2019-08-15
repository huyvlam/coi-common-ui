import { apiPathToTenantVersion } from './api-base';

const apiPathToNavigation = ({ tenant } = {}) => {
  return `${apiPathToTenantVersion({tenant})}/navigation`;
}

const apiPathToNavState = ({ tenant } = {}) => {
  return `${apiPathToNavigation({tenant})}/state`;
}

const apiPathToNavStateId = ({ tenant, navStateId = '' } = {}) => {
  return `${apiPathToNavState({tenant})}/${navStateId}`;
}

const navStateApiPath = (type, options) => {
  if (!type) {
    throw Error('missing required argument - type');
  }

  if (type === 'navigation') {return apiPathToNavigation(options);}
  if (type === 'nav state') {return apiPathToNavState(options);}
  if (type === 'nav state id') {return apiPathToNavStateId(options);}
};

export default navStateApiPath;
