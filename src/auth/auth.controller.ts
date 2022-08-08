import { Body, Controller, Post, Req } from '@nestjs/common';
import { AccountDto, AuthDto } from '../dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() auth: AccountDto) {
    return this.authService.signup(auth);
  }
  @Post('login')
  login(
    @Body()
    authDto: AuthDto,
  ) {
    return this.authService.login(authDto);
  }
}
