import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';

import { Friend as FriendModel } from '@prisma/client';
import { FriendService } from './friend.service';
import { UserService } from 'src/user/user.service';

@Controller('friend')
export class FriendController {
  constructor(
    private readonly friendService: FriendService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(
    @Body() userData: { userById: number; friendById: number },
  ): Promise<FriendModel> {
    const { userById, friendById } = userData;
    const userBy = await this.userService.user({ id: Number(userById) });
    const friendBy = await this.userService.user({ id: Number(friendById) });
    if (!userBy || !friendBy) {
      throw new BadRequestException('User Not Found');
    }
    return this.friendService.createFriend({
      userById: Number(userById),
      friendById: Number(friendById),
    });
  }

  @Delete(':userById/:friendById')
  remove(
    @Param('userById') userById: string,
    @Param('friendById') friendById: string,
  ): Promise<FriendModel> {
    return this.friendService.deleteFriend({
      userById_friendById: {
        userById: Number(userById),
        friendById: Number(friendById),
      },
    });
  }
}
