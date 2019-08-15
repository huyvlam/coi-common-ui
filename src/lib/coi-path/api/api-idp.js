import { objectToUrlParam } from 'LIB/coi-util/path';
import { idpBasePath } from './api-base';

const idpApiPath = (type, options) => {
  if (!type) {
    throw Error('missing required argument - type');
  }

  if (type === 'base') {return `${idpBasePath()}${objectToUrlParam(options)}`;}
};

export default idpApiPath;
