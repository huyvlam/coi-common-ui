import { apiPathToNonTenantVersion } from './api-base';

const apiPathToDictionary = () => {
  return `${apiPathToNonTenantVersion()}/dictionary`;
}

export const apiPathToDictionaryFields = ({ locale }) => {
  return `${apiPathToDictionary()}/fields?locale=${locale}`;
}

const apiPathToDictionaryRulers = ({ country }) => {
  const param = country ? `?country=${country}` : '';
  return `${apiPathToDictionary()}/rulers${param}`;
}

const dictionaryApiPath = (type, options) => {
  if (!type) {
    throw Error('missing required argument - type');
  }

  if (type === 'fields') {return apiPathToDictionaryFields(options);}
  if (type === 'rulers') {return apiPathToDictionaryRulers(options);}
};

export default dictionaryApiPath;
