import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/service';
import { TokenRepository } from 'src/auth/repository';
import { AuthController } from 'src/auth/controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, TokenRepository],
  exports: [TokenRepository, AuthService],
})
export class AuthModule {}
