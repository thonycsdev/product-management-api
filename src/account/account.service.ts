import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AccountService {
  constructor(private userService: UserService) {}

  async login(request: { username: string; password: string }) {
    var result = await this.userService.LoginUser(request);
    return result;
  }
}
