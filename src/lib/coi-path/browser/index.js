import {
  browserBasePath, browserPathToUI, browserPathToTenant, browserPathToVersion, browserPathToClient
} from './browser-base';
import {
  browserPathToContact, browserPathToEnrollment, browserPathToProfile, browserPathToProfileWorkflow
} from './browser-client';

const browserPath = (type, options) => {
  if (!type) {
    throw Error('missing required argument - type');
  }

  // BASE PATHS
  if (type === 'base') {return browserBasePath();}
  if (type === 'ui') {return browserPathToUI();}
  if (type === 'tenant') {return browserPathToTenant(options);}
  if (type === 'version') {return browserPathToVersion(options);}
  if (type === 'client') {return browserPathToClient(options);}

  // UI CLIENT PATHS: enrollment, contact, profile, ulm, recovery, org-admin
  if (type === 'contact') {return browserPathToContact(options);}
  if (type === 'enrollment') {return browserPathToEnrollment(options);}
  if (type === 'profile') {return browserPathToProfile(options);}
  if (type === 'profile personal') {return browserPathToProfileWorkflow({ workflow: 'personal' });}
  if (type === 'profile security') {return browserPathToProfileWorkflow({ workflow: 'security' });}
  if (type === 'profile settings') {return browserPathToProfileWorkflow({ workflow: 'settings' });}
};

export default browserPath;
