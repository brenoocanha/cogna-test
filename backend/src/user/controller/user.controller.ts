import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { ParamIDDto } from 'src/@shared/dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserService } from 'src/user/service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Get(':id')
  getUserById(@Param() { id }: ParamIDDto): Promise<User | null> {
    return this.userService.findById(id);
  }
}
