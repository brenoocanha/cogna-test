import { IsUUID } from 'class-validator';

export class ParamIDDto {
  @IsUUID(4, { message: 'Invalid UUID provided' })
  id: string;
}
