import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AccountRequestDto } from './dto/account.request.dto';
import { UserResponseDto } from './dto/user.response.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async AddUser(user: AccountRequestDto) {
    try {
      await this.prismaService.user.create({
        data: {
          name: user.name,
          cpf: user.cpf,
          email: user.email,
          role: user.role,
          photo: user.photo,
          password: user.password,
          username: user.username,
        },
      });
      return 0;
    } catch (error) {
      console.error(error);
      return -1;
    }
  }
  async GetUserById(userId: number) {
    var user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) return undefined;
    return user;
  }
  async LoginUser(loginDto: { username: string; password: string }) {
    var user = await this.prismaService.user.findUnique({
      where: {
        cpf: loginDto.username,
        password: loginDto.password,
      },
    });
    if (!user) return undefined;

    const response: UserResponseDto = {
      name: user.name,
      photo: user.photo,
      cpf: user.cpf,
      email: user.email,
      role: user.role as Roles,
      created_at: user.createdAt,
    };
    return response;
  }
}
