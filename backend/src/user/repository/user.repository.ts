import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/service/database.service';
import { UserRepositoryInterface } from 'src/user/repository';
import { CreateUserDto, UpdateUserDto } from 'src/user/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly database: DatabaseService) {}

  findById(id: User['id']): Promise<User | null> {
    return this.database.user.findUnique({
      where: { id },
    });
  }

  findByIdOrThrow(id: User['id']): Promise<User> {
    return this.database.user.findUniqueOrThrow({
      where: { id },
    });
  }

  findByEmail(email: User['email']): Promise<User | null> {
    return this.database.user.findUnique({
      where: {
        email_is_deleted: {
          email,
          is_deleted: false,
        },
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.database.user.findMany();
  }

  create({
    password: unhashedPassword,
    ...userData
  }: CreateUserDto): Promise<User> {
    const hashedPassword = bcrypt.hashSync(unhashedPassword, 10);
    return this.database.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
  }

  update(updateUserDto: UpdateUserDto): Promise<User | null> {
    const { id, ...data } = updateUserDto;
    return this.database.user.update({
      where: { id },
      data,
    });
  }

  async updatePasswordById(
    id: User['id'],
    hashedPassword: string,
  ): Promise<{ message: string }> {
    return this.database.user
      .update({
        where: { id },
        data: {
          password: hashedPassword,
          security_code: null,
          security_code_expiration: null,
          security_code_used: true,
        },
      })
      .then(() => ({ message: 'Password updated successfully' }));
  }

  async delete(id: User['id']): Promise<void> {
    await this.database.user.update({
      where: { id },
      data: { deleted_at: new Date(), is_deleted: true },
    });
  }

  async updateLastLoginByUserId(id: User['id']): Promise<void> {
    await this.database.user.update({
      where: { id },
      data: { last_login: new Date() },
    });
  }
}
