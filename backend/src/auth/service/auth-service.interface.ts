import { User } from '@prisma/client';
import {
  LoginCredentialsDTO,
  RecoverPasswordDTO,
  RefreshTokenDTO,
} from 'src/auth/dto';
import { AuthToken } from 'src/auth/types';

export interface AuthServiceInterface {
  login(loginCredentialsDTO: LoginCredentialsDTO): Promise<AuthToken>;
  refreshToken(refreshTokenDto: RefreshTokenDTO): Promise<AuthToken>;
  generateJWT({ email, id, name, last_login }: User): Promise<AuthToken>;
  requestRecoveryCode(email: User['email']): Promise<{ message: string }>;
  recoverPassword(
    recoverPasswordDTO: RecoverPasswordDTO,
  ): Promise<{ message: string }>;
}
