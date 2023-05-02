import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-code')
  async sendOneTimeCode(@Body('email') email: string): Promise<void> {
    const code = await this.emailService.generateAndSendOneTimeCode(email);
    await this.emailService.sendEmail(
      email,
      'Your One-Time Code',
      `Your one-time code is: ${code}`,
    );
  }
}
