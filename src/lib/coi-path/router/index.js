import {
  routerPathToTenant, routerPathToVersion, routerPathToClient
} from './router-base';

const routerPath = (type, options) => {
  if (!type) {
    throw Error('missing required argument - type');
  }

  if (type === 'tenant') {return routerPathToTenant(options);}
  if (type === 'version') {return routerPathToVersion(options);}
  if (type === 'client') {return routerPathToClient(options);}
};

export default routerPath;
