import { loginAction } from './auth/login.action';
import { refreshTokenAction } from './auth/refresh-token.action';
import { getProductsAction } from './get-products.action';

const actions = {
  auth: {
    loginAction,
    refreshTokenAction,
    getProductsAction,
  },
};

export default actions;
