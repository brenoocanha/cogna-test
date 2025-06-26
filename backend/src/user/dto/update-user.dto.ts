import { OmitType, PartialType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateUserDto } from 'src/user/dto';

export class UpdateUserDto extends OmitType(PartialType(CreateUserDto), [
  'password',
]) {
  @IsUUID(4, { message: 'Invalid user ID' })
  id: string;
}
