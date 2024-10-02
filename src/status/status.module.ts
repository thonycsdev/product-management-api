import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StatusController } from './status.controller';

@Module({
  imports: [PrismaModule],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
