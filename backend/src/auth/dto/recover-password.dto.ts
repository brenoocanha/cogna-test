import { IsEmail, IsString, Length } from 'class-validator';
import { IsStrongPassword } from 'src/@shared/decorators';

export class RecoverPasswordDTO {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 6, { message: 'O código deve ter 6 dígitos' })
  code: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
