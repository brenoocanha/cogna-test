import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { IsStrongPassword } from 'src/@shared/decorators';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  name: string;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @Matches(/^\+\d{1,3}\d{9,15}$/, {
    message: 'Phone number must be in international format',
  })
  phone: string;

  @IsStrongPassword({ message: 'Password is not strong enough' })
  password: string;
}
