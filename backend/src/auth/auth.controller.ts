
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('auth/login')
  login(@Body() body) {
    return this.service.login(body);
  }

  @Post('api/register')
  register(@Body() body) {
    return this.service.register(body);
  }
}
