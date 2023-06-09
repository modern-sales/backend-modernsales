// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailModule } from '@services/sendgrid_email/email.module';
import { DynamoDBModule } from '@services/aws_dynamodb/dynamodb.module';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [EmailModule, DynamoDBModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
