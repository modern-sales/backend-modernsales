import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() user: { email: string; password: string; name: string }) {
    return await this.authService.signUp(user);
  }

  @Post('login')
  async login(@Body() credentials: { email: string; password: string }) {
    return await this.authService.login(credentials);
  }
}
