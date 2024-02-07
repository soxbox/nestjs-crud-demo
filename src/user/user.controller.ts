import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

import { User as UserModel, Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() userData: Prisma.UserCreateInput): Promise<UserModel> {
    const { email, name } = userData;

    return this.userService.createUser({
      name,
      email,
    });
  }

  @Get()
  findAll(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() userData: { name: string; email: string },
  ): Promise<UserModel> {
    const { email, name } = userData;
    return this.userService.updateUser({
      where: {
        id: Number(id),
      },
      data: {
        email,
        name,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({
      id: Number(id),
    });
  }

  @Get(':id/recomendations')
  recomendations(@Param('id') id: string): Promise<{ id: number, name: string, depth: number, distance: number }[]> {
    return this.userService.friendRecomendation(Number(id))
  }
}
