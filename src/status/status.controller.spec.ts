import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from './status.controller';
import { HttpStatus } from '@nestjs/common';
import { StatusService } from './status.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

describe('StatusController', () => {
  let controller: StatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [StatusController],
      providers: [StatusService, PrismaService],
    }).compile();

    controller = module.get<StatusController>(StatusController);
  });

  it('Should Return 200', async () => {
    const response = await fetch('http://localhost:3001/status');
    expect(response.status).toBe(HttpStatus.OK);
  });
  it('Should return the date when the response was created', async () => {
    const response = await fetch('http://localhost:3001/status');
    const responseBody = await response.json();
    expect(responseBody.created_at).toBeDefined();
    const convertedDate = new Date(responseBody.created_at);
    expect(convertedDate).toBeDefined();
    expect(convertedDate).not.toBe(new Date());
  });
  it('Should return the database version', async () => {
    const response = await fetch('http://localhost:3001/status');
    const responseBody = await response.json();
    expect(responseBody.dependencies.database.database_version).toBeDefined();
    expect(responseBody.dependencies.database.database_version).toContain('9');
  });
  it('Should return the active connection at the moment in the local test = 1 or 2', async () => {
    const response = await fetch('http://localhost:3001/status');
    const responseBody = await response.json();
    expect(responseBody.dependencies.database.active_connections).toBeDefined();
    expect(
      responseBody.dependencies.database.active_connections,
    ).toBeGreaterThanOrEqual(1);
  });
  it('Should return the max connection available', async () => {
    const response = await fetch('http://localhost:3001/status');
    const responseBody = await response.json();
    expect(responseBody.dependencies.database.max_connections).toBeDefined();
    expect(
      responseBody.dependencies.database.max_connections,
    ).toBeGreaterThanOrEqual(100);
  });
});
