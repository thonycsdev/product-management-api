import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { StatusController } from './status/status.controller';
import { StatusService } from './status/status.service';
import { StatusModule } from './status/status.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [StatusModule, PrismaModule],
  controllers: [AppController, StatusController],
  providers: [AppService, PrismaService, StatusService],
})
export class AppModule {}
