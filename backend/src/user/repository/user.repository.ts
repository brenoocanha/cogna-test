import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/service/database.service';
import { UserRepositoryInterface } from 'src/user/repository';
import { CreateUserDto, UpdateUserDto } from 'src/user/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly database: DatabaseService) {}

  /**
   * Finds a user by their ID.
   * @param id - The ID of the user to find.
   * @returns A promise that resolves to the user if found, or null if not found.
   */
  findById(id: User['id']): Promise<User | null> {
    return this.database.user.findUnique({
      where: { id },
    });
  }

  /**
   * Finds a user by their ID or throws an error if not found.
   * @param id - The ID of the user to find.
   * @returns A promise that resolves to the user if found.
   * @throws Will throw a HTTP 404 (NOT FOUND) error if the user is not found.
   */
  findByIdOrThrow(id: User['id']): Promise<User> {
    return this.database.user.findUniqueOrThrow({
      where: { id },
    });
  }

  /**
   * Finds a user by their email address, excluding deleted users.
   * @param email - The email address of the user to find.
   * @returns A promise that resolves to the user if found, or null if not found.
   */
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

  /**
   * Finds all users in the database.
   * @returns A promise that resolves to an array of users.
   */
  findAll(): Promise<User[]> {
    return this.database.user.findMany();
  }

  /**
   * Creates a new user in the database.
   * @param createUserDto - The data to create the user with, including a plaintext password.
   * @returns A promise that resolves to the created user.
   */
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

  /**
   * Updates an existing user in the database.
   * @param updateUserDto - The data to update the user with, including the user ID.
   * @returns A promise that resolves to the updated user, or null if not found.
   */
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

  /**
   * Deletes a user by marking them as deleted in the database.
   * @param id - The ID of the user to delete.
   * @returns A promise that resolves when the user is marked as deleted.
   */
  async delete(id: User['id']): Promise<void> {
    await this.database.user.update({
      where: { id },
      data: { deleted_at: new Date(), is_deleted: true },
    });
  }

  /**
   * Updates the last login timestamp for a user.
   * @param id - The ID of the user to update.
   * @returns A promise that resolves when the last login is updated.
   */
  async updateLastLoginByUserId(id: User['id']): Promise<void> {
    await this.database.user.update({
      where: { id },
      data: { last_login: new Date() },
    });
  }
}
