import {
  BadRequestException,
  Injectable,
  Logger,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from 'src/auth/repository';
import { AuthServiceInterface } from 'src/auth/service';
import {
  LoginCredentialsDTO,
  RecoverPasswordDTO,
  RefreshTokenDTO,
} from 'src/auth/dto';
import { AuthToken } from 'src/auth/types';
import { UserRepository } from 'src/user/repository';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements AuthServiceInterface {
  private logger = new Logger(AuthService.name);

  private readonly jwtSecret: string;
  private readonly jwtTokenExpiresIn: string;
  private readonly jwtRefreshSecret: string;
  private readonly jwtRefreshTokenExpiresIn: string;

  constructor(
    private readonly usersRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly tokenRepository: TokenRepository,
    private readonly configService: ConfigService,
  ) {
    this.jwtSecret = this.configService.get<string>('jwt.secret') as string;
    this.jwtTokenExpiresIn = this.configService.get<string>(
      'jwt.tokenExpiresIn',
    ) as string;
    this.jwtRefreshSecret = this.configService.get<string>(
      'jwt.refreshSecret',
    ) as string;
    this.jwtRefreshTokenExpiresIn = this.configService.get<string>(
      'jwt.refreshExpiresIn',
    ) as string;
  }

  async login(loginCredentialsDto: LoginCredentialsDTO): Promise<AuthToken> {
    if (!loginCredentialsDto) {
      throw new BadRequestException('Invalid credentials');
    }
    const { email, password } = loginCredentialsDto;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    } else if (!user.active) {
      throw new UnauthorizedException('O usuário não está ativo');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return await this.generateJWT(user);
  }

  async refreshToken({ refreshToken }: RefreshTokenDTO): Promise<AuthToken> {
    const payload = this.jwtService.verify(refreshToken, {
      secret: this.jwtSecret,
    });

    const user = await this.usersRepository.findByEmail(payload.email);
    if (!user) {
      throw new BadRequestException('Invalid refresh token');
    }

    const storedToken = await this.tokenRepository.findToken(
      user.id,
      refreshToken,
      'REFRESH',
    );
    if (!storedToken) {
      throw new BadRequestException('Invalid or expired refresh token');
    }

    return this.generateJWT(user);
  }

  async generateJWT({ email, id, name, last_login }: User): Promise<AuthToken> {
    const refresh_token = this.jwtService.sign(
      { email, sub: id },
      {
        secret: this.jwtSecret,
        expiresIn: this.jwtTokenExpiresIn,
      },
    );

    const token = this.jwtService.sign(
      {
        id,
        name,
        email,
      },
      {
        secret: this.jwtSecret,
        expiresIn: this.jwtTokenExpiresIn,
      },
    );

    await this.updateLastLogin(id);

    await this.tokenRepository.createOrUpdateToken(
      id,
      refresh_token,
      'REFRESH',
    );
    await this.tokenRepository.createOrUpdateToken(id, token, 'AUTH');

    return { token, refresh_token, last_login };
  }

  private async updateLastLogin(id: User['id']): Promise<void> {
    await this.usersRepository.updateLastLoginByUserId(id);
  }

  requestRecoveryCode(email: User['email']): Promise<{ message: string }> {
    this.logger.warn(
      `requestRecoveryCode method is not implemented yet. Email: ${email}`,
    );
    throw new NotImplementedException('Method not implemented.');
  }

  async recoverPassword({
    email,
    code,
    password,
  }: RecoverPasswordDTO): Promise<{ message: string }> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new BadRequestException('Usuário não encontrado');

    if (user.security_code !== code) {
      throw new BadRequestException('Código de verificação inválido');
    }

    if (
      user.security_code_expiration &&
      user.security_code_expiration < new Date()
    ) {
      throw new BadRequestException('Código de verificação expirado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.usersRepository.updatePasswordById(user.id, hashedPassword);

    return { message: 'Senha atualizada com sucesso!' };
  }
}
