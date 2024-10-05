import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AccountService } from './account.service';
import { Response } from 'express';
import { AccountRequestDto } from '../user/dto/account.request.dto';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('create')
  async create(@Body() req: AccountRequestDto, @Res() res: Response) {
    if (!req) return res.status(HttpStatus.BAD_REQUEST).end();
    var result = await this.accountService.create(req);
    if (result === 0) return res.status(HttpStatus.CREATED).json(result);
    return res.status(HttpStatus.BAD_REQUEST).end();
  }

  @Post('login')
  async login(
    @Body() req: { username: string; password: string },
    @Res() res: Response,
  ) {
    if (!req.username || !req.password)
      return res.status(HttpStatus.BAD_REQUEST).end();
    var result = await this.accountService.login(req);
    if (result) return res.status(HttpStatus.OK).json(result);
    console.log(req, result);
    return res.status(HttpStatus.BAD_REQUEST).end();
  }
}
