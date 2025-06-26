import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from 'src/user/dto';

export interface UserRepositoryInterface {
  findById(id: User['id']): Promise<User | null>;
  findByIdOrThrow(id: User['id']): Promise<User>;
  findAll(): Promise<User[]>;
  create(createUserDto: CreateUserDto): Promise<User>;
  update(updateUserDto: UpdateUserDto): Promise<User | null>;
  delete(id: string): Promise<void>;
}
