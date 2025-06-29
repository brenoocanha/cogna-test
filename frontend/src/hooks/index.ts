import { useLogin } from './use-login';
import { useRegister } from './use-register';

const hooks = {
  auth: {
    useLogin,
    useRegister,
  },
};

export default hooks;
