import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [PrismaModule, UserModule, FriendModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
