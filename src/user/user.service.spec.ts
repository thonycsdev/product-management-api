import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import userFixture from '../../test/fixtures/userFixture';
import { AccountRequestDto } from './dto/account.request.dto';
import { faker } from '@faker-js/faker/.';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;
  let dto: AccountRequestDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
    dto = userFixture.buildAccountRequestDTO();
    await prisma.user.deleteMany();
  });

  it('When created a account, should add created at', async () => {
    const result = await service.AddUser(dto);
    expect(result).toBe(0);
    var results = await prisma.user.findMany();
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].createdAt).toBeDefined();
  });
  it('When created a account, should add a id', async () => {
    await service.AddUser(dto);
    var results = await prisma.user.findMany();
    expect(results[0].id).toBeDefined();
  });

  it('should return the user when get by id', async () => {
    await service.AddUser(dto);
    var results = await prisma.user.findMany();
    const user = results[0];
    const result = await service.GetUserById(user.id);
    expect(result).toBeDefined();
    expect(result).toEqual(user);
  });
  it('should NOT return the user when get by id', async () => {
    const result = await service.GetUserById(faker.number.int());
    expect(result).toBeUndefined();
  });

  it('Should return the user information when the username and password are correct', async () => {
    await service.AddUser(dto);
    var results = await prisma.user.findMany();
    const user = results[0];

    const loginDto = { username: user.username, password: user.password };
    var loginInformation = await service.LoginUser(loginDto);
    expect(loginInformation).toBeDefined();
    expect(loginInformation.name).toBe(user.name);
    expect(loginInformation.cpf).toBe(user.cpf);
    expect(loginInformation.email).toBe(user.email);
    expect(loginInformation.role).toBe(user.role);
  });
  it('Should return undefined when no username and password where found', async () => {
    const loginDto = { username: dto.username, password: dto.password };
    var loginInformation = await service.LoginUser(loginDto);
    expect(loginInformation).toBeUndefined();
  });
});
