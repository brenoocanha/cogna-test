import { IsEmail, IsString } from 'class-validator';

export class LoginCredentialsDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
