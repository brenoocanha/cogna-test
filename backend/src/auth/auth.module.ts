import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TokenRepository } from './repository/token.repository';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN },
    }),
  ],
  providers: [AuthService, JwtService, TokenRepository],
  exports: [TokenRepository, AuthService],
})
export class AuthModule {}
