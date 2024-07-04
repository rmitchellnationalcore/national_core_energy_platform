import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { LocalGuard } from '../local.guard';
import { AuthService } from './auth.service';
import { LoginUserDto } from './models/login-user.dto';
import { RegisterUserDto } from './models/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() user: RegisterUserDto) {
    return this.authService.registerUser(user);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  loginUser(@Req() req, @Body() user: LoginUserDto) {
    console.log("SESSIONS IS ")
    console.log(req.session)
    console.log("THAT'S THE SESSION BEING RETURNED!")
    return req.session;
  }
}