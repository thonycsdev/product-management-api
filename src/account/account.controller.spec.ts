import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { AccountRequestDto } from 'src/user/dto/account.request.dto';
import userFixture from '../../test/fixtures/userFixture';
import { HttpStatus } from '@nestjs/common';
import { AccountModule } from './account.module';

describe('AccountController', () => {
  let controller: AccountController;
  let userService: UserService;
  let prisma: PrismaService;
  let dto: AccountRequestDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule, PrismaModule, AccountModule],
      controllers: [AccountController],
      providers: [AccountService, UserService, PrismaService],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    userService = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
    dto = userFixture.buildAccountRequestDTO();
  });
  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  it('Should return 200 when user has correct username and password', async () => {
    await userService.AddUser(dto);
    const user = await prisma.user.findFirst();
    var response = await fetch('http://localhost:3000/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    });
    expect(response.status).toBe(HttpStatus.OK);
  });
  it('Should return 405 when user has no username in the request', async () => {
    await userService.AddUser(dto);
    const user = await prisma.user.findFirst();
    var response = await fetch('http://localhost:3000/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: null,
        password: user.password,
      }),
    });
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
  it('Should return 405 when user has no password in the request', async () => {
    await userService.AddUser(dto);
    const user = await prisma.user.findFirst();
    var response = await fetch('http://localhost:3000/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        password: null,
      }),
    });
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
  it('Should return 405 when user has no account', async () => {
    var response = await fetch('http://localhost:3000/account/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'notfound',
        password: 'notfound',
      }),
    });
    expect(response.status).toBe(HttpStatus.BAD_REQUEST);
  });
  it('Should increase the size of the array when create a account for a user', async () => {
    const dto = userFixture.buildAccountRequestDTO();

    var response = await fetch('http://localhost:3000/account/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });
    expect(response.status).toBe(201);
  });
});
