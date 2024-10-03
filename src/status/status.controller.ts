import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { StatusService } from './status.service';
import { Status } from './status.entity';

@Controller('status')
export class StatusController {
  constructor(private readonly service: StatusService) {}
  @Get()
  async GetStatus(@Res() res: Response) {
    const databaseStats = await this.service.getDatabaseStats();
    const response: Status = {
      created_at: new Date().toUTCString(),
      dependencies: {
        database: {
          database_version: databaseStats.database_version,
          max_connections: databaseStats.max_connections,
          active_connections: databaseStats.active_connections,
        },
      },
    };

    return res.status(HttpStatus.OK).json(response);
  }
}
