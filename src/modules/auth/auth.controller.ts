// auth.controller.ts
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-otp')
  @HttpCode(200)
  async requestOtp(@Body('email') email: string): Promise<void> {
    await this.authService.sendOtp(email);
  }

  @Post('verify-otp')
  @HttpCode(200)
  async verifyOtp(
    @Body('email') email: string,
    @Body('otp') otp: string,
  ): Promise<void> {
    await this.authService.verifyOtp(email, otp);
  }
}
