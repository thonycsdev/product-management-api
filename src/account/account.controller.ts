import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AccountService } from './account.service';
import { Response } from 'express';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('login')
  async login(
    @Body() req: { username: string; password: string },
    @Res() res: Response,
  ) {
    if (!req.username || !req.password)
      return res.status(HttpStatus.BAD_REQUEST).end();
    var result = await this.accountService.login(req);
    if (result) return res.status(HttpStatus.OK).json(result);
    return res.status(HttpStatus.BAD_REQUEST).end();
  }

  //falta criar usuario novos
}
