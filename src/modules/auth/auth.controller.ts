// auth.controller.ts
import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('request-otp')
  @HttpCode(200)
  async requestOtp(@Body('email') email: string): Promise<{ success: boolean; message?: string }> {
    const success = await this.authService.sendOtp(email);
    if (success) {
      return { success };
    } else {
      return { success, message: 'Email not sent' }; // Return a message when the email fails to send
    }
  }

  @Post('signup')
  @HttpCode(201)
  async signUpUser(
    @Body('email') email: string,
    @Body('name') name: string,
  ): Promise<{ success: boolean }> {
    const success = await this.authService.signUpUser(email, name);
    return { success };
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
