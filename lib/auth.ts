import Cookies from 'js-cookie';

export const LEGACY_TOKEN_KEY = 'rdmc_token';
export const ADMIN_TOKEN_KEY = 'rdmc_admin_token';
export const CUSTOMER_TOKEN_KEY = 'rdmc_customer_token';

type Portal = 'admin' | 'customer';

const getPortalFromPath = (): Portal => {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
    return 'admin';
  }
  return 'customer';
};

export const getTokenKey = (portal: Portal = getPortalFromPath()) => {
  return portal === 'admin' ? ADMIN_TOKEN_KEY : CUSTOMER_TOKEN_KEY;
};

export const getToken = (portal: Portal = getPortalFromPath()) => {
  return Cookies.get(getTokenKey(portal)) || Cookies.get(LEGACY_TOKEN_KEY);
};

export const setToken = (token: string, portal: Portal = getPortalFromPath()) => {
  Cookies.set(getTokenKey(portal), token, { expires: 7 });
  Cookies.remove(LEGACY_TOKEN_KEY);
};

export const removeToken = (portal: Portal = getPortalFromPath()) => {
  Cookies.remove(getTokenKey(portal));
  Cookies.remove(LEGACY_TOKEN_KEY);
};
