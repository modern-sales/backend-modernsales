// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@modules/users/users.module';
import { CoursesModule } from '@modules/courses/courses.module';
import { StripeModule } from '@services/stripe/stripe.module';
import { EmailModule } from '@services/sendgrid_email/email.module';
import { AuthModule } from '@modules/auth/auth.module';
import { DynamoDBModule } from '@services/aws_dynamodb/dynamodb.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    CoursesModule,
    EmailModule,
    StripeModule,
    AuthModule,
    DynamoDBModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
