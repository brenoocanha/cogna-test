import { Module } from '@nestjs/common';
import { UserController } from 'src/user/controller';
import { UserService } from 'src/user/service';
import { UserRepository } from './repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
