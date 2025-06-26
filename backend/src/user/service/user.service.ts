import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from 'src/user/repository';
import { UserServiceInterface } from 'src/user/service';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(private readonly userRepository: UserRepository) {}

  findById(id: User['id']): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  findByIdOrThrow(id: User['id']): Promise<User> {
    return this.userRepository.findByIdOrThrow(id);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.create(createUserDto);
  }

  update(updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.userRepository.update(updateUserDto);
  }

  delete(id: User['id']): Promise<void> {
    return this.userRepository.delete(id);
  }
}
