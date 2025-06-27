import { IsEmail } from 'class-validator';

export class SendPasswordRecoveryEmailDTO {
  @IsEmail()
  email: string;
}
