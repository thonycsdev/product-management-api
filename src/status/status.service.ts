import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Database } from './status.entity';

@Injectable()
export class StatusService {
  constructor(private prismaService: PrismaService) {}

  async getDatabaseStats(): Promise<Database> {
    const version = await this.getDatabaseVersion();

    const activeConnections = await this.getActiveConnectionsNumber();

    const maxConnections = await this.getMaxConnections();

    return {
      database_version: version,
      active_connections: activeConnections,
      max_connections: maxConnections,
    } as Database;
  }

  async getDatabaseVersion() {
    var version = await this.prismaService.$queryRaw`SELECT version()`;
    return version[0]['version()'];
  }

  async getActiveConnectionsNumber(): Promise<number> {
    var active_connections = await this.prismaService
      .$queryRaw`SELECT COUNT(*) AS data FROM information_schema.processlist WHERE COMMAND != 'Sleep'`;
    const number = Number(active_connections[0].data);
    return number;
  }
  async getMaxConnections(): Promise<number> {
    var maxConnections = await this.prismaService
      .$queryRaw`SHOW VARIABLES LIKE 'max_connections'`;
    const number = Number(maxConnections[0].Value);
    return number;
  }
}
