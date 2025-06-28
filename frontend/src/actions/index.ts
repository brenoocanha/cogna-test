import { loginAction } from './auth/login.action';
import { refreshTokenAction } from './auth/refresh-token.action';

const actions = {
  auth: {
    loginAction,
    refreshTokenAction,
  },
};

export default actions;
