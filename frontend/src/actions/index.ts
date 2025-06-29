import { loginAction } from './auth/login.action';
import { refreshTokenAction } from './auth/refresh-token.action';
import { registerAction } from './auth/regster.action';
import { getProductsAction } from './get-products.action';

const actions = {
  auth: {
    loginAction,
    refreshTokenAction,
    registerAction,
  },
  product: {
    getProductsAction,
  },
};

export default actions;
