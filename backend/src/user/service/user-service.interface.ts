import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from 'src/user/dto';

export interface UserServiceInterface {
  /**
   * Fetches a user by their ID.
   * @param id - The ID of the user to fetch.
   * @returns A promise that resolves to a User object or null if not found.
   */
  findById(id: User['id']): Promise<User | null>;

  /**
   * Fetches a user by their ID, throwing an error if not found.
   * @param id - The ID of the user to fetch.
   * @returns A promise that resolves to a User object.
   * @throws An error if the user is not found.
   */
  findByIdOrThrow(id: User['id']): Promise<User>;

  /**
   * Fetches all users.
   * @returns A promise that resolves to an array of User objects.
   */
  findAll(): Promise<User[]>;

  /**
   * Creates a new user.
   * @param createUserDto - The data transfer object containing user creation details.
   * @returns A promise that resolves to the created User object.
   */
  create(createUserDto: CreateUserDto): Promise<User>;

  /**
   * Updates an existing user.
   * @param updateUserDto - The data transfer object containing user update details.
   * @returns A promise that resolves to the updated User object or null if not found.
   */
  update(updateUserDto: UpdateUserDto): Promise<User | null>;

  /**
   * Deletes a user by their ID.
   * @param id - The ID of the user to delete.
   * @returns A promise that resolves when the user is deleted.
   */
  delete(id: User['id']): Promise<void>;
}
