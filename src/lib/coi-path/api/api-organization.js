import { apiPathToNonTenantVersion } from './api-base';

// apiPathToCompanyDNBSearch
const apiPathToDNBSearch = ({ env, consulVersion } = {}) => {
  return `${apiPathToNonTenantVersion({env, consulVersion})}/address`;
}

// apiPathToCompanyParties
const apiPathToDNBOrg = ({ env, consulVersion } = {}) => {
  return `${apiPathToDNBSearch({env, consulVersion})}/parties`;
}

// apiPathToCompanyDetails
const apiPathToSearchOrgDomain = ({ env, consulVersion } = {}) => {
  return `${apiPathToDNBOrg({env, consulVersion})}/search`;
}

// apiPathToCompany
const apiPathToSearchOrgName = ({ env, consulVersion } = {}) => {
  return `${apiPathToDNBOrg({env, consulVersion})}/name`;
}

// apiPathToCompanyDomain
const apiPathToDNBDomain = ({ env, consulVersion } = {}) => {
    return `${apiPathToDNBSearch({env, consulVersion})}/domain`;
}

// apiPathToCompanyDomainValidator
const apiPathToValidateOrgDomain = ({ env, consulVersion } = {}) => {
    return `${apiPathToDNBDomain({env, consulVersion})}/validator`
}

// apiPathToCity
const apiPathToDNBCity = ({ env, consulVersion } = {}) => {
  return `${apiPathToDNBSearch({env, consulVersion})}/city`;
}

const apiPathToSearchCity = ({ env, consulVersion } = {}) => {
  return `${apiPathToDNBCity({ env, consulVersion })}/search`;
}

const organizationApiPath = (type, options) => {
  if (!type) {
    throw Error('missing required argument - type');
  }

  if (type === 'dnb search') {return apiPathToDNBSearch(options);}
  if (type === 'dnb org') {return apiPathToDNBOrg(options);}
  if (type === 'search org domain') {return apiPathToSearchOrgDomain(options);}
  if (type === 'search org name') {return apiPathToSearchOrgName(options);}
  if (type === 'dnb domain') {return apiPathToDNBDomain(options);}
  if (type === 'validate domain') {return apiPathToValidateOrgDomain(options);}
  if (type === 'dnb city') {return apiPathToDNBCity(options);}
  if (type === 'search city') {return apiPathToSearchCity(options);}
};

export default organizationApiPath;
