import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { AccountDto } from 'src/dto';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private service: UserService) {}
  @Get('me')
  allUser(@GetUser() user: User) {
    return user;
  }

  @Patch('me')
  updateName(@GetUser() user: User, @Body() userDetail: Partial<AccountDto>) {
    return this.service.updateUser(userDetail, user.id);
  }
}
