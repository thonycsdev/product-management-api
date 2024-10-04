import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [UserModule, PrismaModule],
  providers: [AccountService, UserService, PrismaService],
  controllers: [AccountController],
})
export class AccountModule {}
