import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
}
