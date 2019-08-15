export const routerPathToTenant = ({ tenant = ':tenant' } = {}) => {
  return `/ui/tenants/${tenant}`
}

export const routerPathToVersion = ({ tenant, version = ':uiVersion' } = {}) => {
  return `${routerPathToTenant({tenant})}/${version}`
}

export const routerPathToClient = ({ tenant, version, client = ':uiClient' } = {}) => {
  return `${routerPathToVersion({tenant, version})}/${client}`
}
