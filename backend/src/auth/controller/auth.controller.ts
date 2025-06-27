import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/service';
import { Public } from 'src/auth/decorators';
import {
  LoginCredentialsDTO,
  RecoverPasswordDTO,
  RefreshTokenDTO,
  SendPasswordRecoveryEmailDTO,
} from 'src/auth/dto';
import { AuthToken } from 'src/auth/types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(
    @Body() LoginCredentialsDTO: LoginCredentialsDTO,
  ): Promise<AuthToken> {
    return this.authService.login(LoginCredentialsDTO);
  }

  @Public()
  @Post('/refresh')
  async refreshToken(
    @Body() RefreshTokenDTO: RefreshTokenDTO,
  ): Promise<AuthToken> {
    return await this.authService.refreshToken(RefreshTokenDTO);
  }

  @Public()
  @Post('/recovery-code')
  async requestRecoveryCode(@Body() { email }: SendPasswordRecoveryEmailDTO) {
    return await this.authService.requestRecoveryCode(email);
  }

  @Public()
  @Post('/recover')
  async recoverPassword(@Body() recoverPasswordDTO: RecoverPasswordDTO) {
    return await this.authService.recoverPassword(recoverPasswordDTO);
  }
}
