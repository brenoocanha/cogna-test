import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from 'src/user/dto';

export interface UserRepositoryInterface {
  findById(id: User['id']): Promise<User | null>;
  findByIdOrThrow(id: User['id']): Promise<User>;
  findByEmail(email: User['email']): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(createUserDto: CreateUserDto): Promise<User>;
  update(updateUserDto: UpdateUserDto): Promise<User | null>;
  updatePasswordById(
    id: User['id'],
    hashedPassword: string,
  ): Promise<{ message: string }>;
  delete(id: string): Promise<void>;
  updateLastLoginByUserId(id: User['id']): Promise<void>;
}
