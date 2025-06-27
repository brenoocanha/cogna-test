import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { ParamIDDto } from 'src/@shared/dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserService } from 'src/user/service';
import { CreateUserDto } from 'src/user/dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUserById(@Param() { id }: ParamIDDto): Promise<User | null> {
    return this.userService.findById(id);
  }

  @Public()
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    // This method should be implemented to create a user.
    // For now, it returns a placeholder.
    return this.userService.create(createUserDto);
  }
}
