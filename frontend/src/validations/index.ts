import { loginSchema } from './auth/login';
import { registerSchema } from './auth/register';
import { createProductSchema } from './product';

const validations = {
  loginSchema,
  registerSchema,
  createProductSchema,
};

export default validations;
