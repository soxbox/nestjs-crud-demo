import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Friend, Prisma } from '@prisma/client';

@Injectable()
export class FriendService {
  constructor(private prisma: PrismaService) {}

  async createFriend(data: Prisma.FriendUncheckedCreateInput): Promise<Friend> {
    return this.prisma.friend.create({
      data,
    });
  }

  async deleteFriend(where: Prisma.FriendWhereUniqueInput): Promise<Friend> {
    return this.prisma.friend.delete({
      where,
    });
  }
}
