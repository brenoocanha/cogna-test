import { useCreateProduct } from './use-create-product';
import { useLogin } from './use-login';
import { useRegister } from './use-register';

const hooks = {
  auth: {
    useLogin,
    useRegister,
  },
  product: {
    useCreateProduct,
  },
};

export default hooks;
