import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AccountRequestDto } from 'src/user/dto/account.request.dto';

@Injectable()
export class AccountService {
  constructor(private userService: UserService) {}

  async login(request: { username: string; password: string }) {
    var result = await this.userService.LoginUser(request);
    return result;
  }
  async create(request: AccountRequestDto) {
    var result = await this.userService.AddUser(request);
    return result;
  }
}
