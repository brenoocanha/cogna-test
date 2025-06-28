import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from 'src/user/dto';

export interface UserRepositoryInterface {
  /**
   * Finds a user by their ID.
   * @param id - The ID of the user to find.
   * @returns A promise that resolves to the user if found, or null if not found.
   */
  findById(id: User['id']): Promise<User | null>;

  /**
   * Finds a user by their ID or throws an error if not found.
   * @param id - The ID of the user to find.
   * @returns A promise that resolves to the user if found.
   * @throws Will throw a HTTP 404 (NOT FOUND) error if the user is not found.
   */
  findByIdOrThrow(id: User['id']): Promise<User>;

  /**
   * Finds a user by their email address, excluding deleted users.
   * @param email - The email address of the user to find.
   * @returns A promise that resolves to the user if found, or null if not found.
   */
  findByEmail(email: User['email']): Promise<User | null>;

  /**
   * Finds all users in the database.
   * @returns A promise that resolves to an array of users.
   */
  findAll(): Promise<User[]>;

  /**
   * Creates a new user in the database.
   * @param createUserDto - The data to create the user with, including a plaintext password.
   * @returns A promise that resolves to the created user.
   */
  create(createUserDto: CreateUserDto): Promise<User>;

  /**
   * Updates an existing user in the database.
   * @param updateUserDto - The data to update the user with, including the user ID.
   * @returns A promise that resolves to the updated user, or null if not found.
   */
  update(updateUserDto: UpdateUserDto): Promise<User | null>;

  /**
   * Updates the password for a user by their ID.
   * @param id - The ID of the user whose password is to be updated.
   * @param hashedPassword - The new hashed password for the user.
   * @returns A promise that resolves to an object containing a success message.
   */
  updatePasswordById(
    id: User['id'],
    hashedPassword: string,
  ): Promise<{ message: string }>;

  /**
   * Deletes a user by marking them as deleted in the database.
   * @param id - The ID of the user to delete.
   * @returns A promise that resolves when the user is marked as deleted.
   */
  delete(id: string): Promise<void>;

  /**
   * Updates the last login timestamp for a user.
   * @param id - The ID of the user to update.
   * @returns A promise that resolves when the last login is updated.
   */
  updateLastLoginByUserId(id: User['id']): Promise<void>;
}
