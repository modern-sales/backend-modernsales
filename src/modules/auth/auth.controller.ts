// auth.controller.ts
import { Controller, Post, Body, HttpCode, UsePipes, ValidationPipe, HttpException, HttpStatus, Res } from '@nestjs/common';
import { Response as ExpressResponse } from 'express'; // Add this
import { AuthService } from './auth.service';
import { LoginOtpDTO, SignupOtpDTO, VerifyLoginOtpDTO, VerifySignupOtpDTO } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login/request-otp')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async requestLoginOtp(@Body() loginOtpDTO: LoginOtpDTO): Promise<{ success: boolean; message?: string }> {
    const success = await this.authService.sendLoginOtp(loginOtpDTO.email);
    if (success) {
      return { success };
    } else {
      return { success, message: 'Email not sent' };
    }
  }

  @Post('signup/request-otp')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async requestSignUpOtp(@Body() signupOtpDTO: SignupOtpDTO): Promise<{ success: boolean; message?: string }> {
    const success = await this.authService.sendSignUpOtp(signupOtpDTO.email);
    if (success) {
      return { success };
    } else {
      return { success, message: 'Email not sent' };
    }
  }

  @Post('login/verify-otp')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async verifyLoginOtp(
    @Body() verifyLoginOtpDTO: VerifyLoginOtpDTO,
    @Res({ passthrough: true }) res: any // Change type to any
  ): Promise<any> { // Change return type to any
    try {
      const verifyLoginRes = await this.authService.verifyLoginOtp(verifyLoginOtpDTO.email, verifyLoginOtpDTO.otp);
      console.log(verifyLoginRes);
      if (verifyLoginRes instanceof Error) {
        throw new HttpException(verifyLoginRes.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      res.cookie('sessionId', verifyLoginRes.sessionId, { httpOnly: true, secure: false, maxAge: 3 * 7 * 24 * 60 * 60 * 1000 });
      res.json({ message: 'OTP verification successful', user:  verifyLoginRes.user}); // Send response with res.json()
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      throw new HttpException('Unknown error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  


  @Post('signup/verify-otp')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async verifySignUpOtp(
    @Body() verifySignupOtpDTO: VerifySignupOtpDTO,
    @Res({ passthrough: true }) res: any 
  ): Promise<{ message: string, user: any }> {
    try {
      const verifySignupRes = await this.authService.verifySignUpOtp(verifySignupOtpDTO.email, verifySignupOtpDTO.otp, verifySignupOtpDTO.name);
      if (verifySignupRes instanceof Error) {
        throw new HttpException(verifySignupRes.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      res.cookie('sessionId', verifySignupRes.sessionId, { httpOnly: true, secure: true, maxAge: 3 * 7 * 24 * 60 * 60 * 1000 });
      return { message: 'OTP verification successful', user: verifySignupRes.user };
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      throw new HttpException('Unknown error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
