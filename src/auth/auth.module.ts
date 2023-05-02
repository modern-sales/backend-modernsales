import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { EmailModule } from '../email/email.module'; // Import EmailModule

@Module({
  controllers: [AuthController],
  imports: [EmailModule], // Add EmailModule to the imports array
})
export class AuthModule {}