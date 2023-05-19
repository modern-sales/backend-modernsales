// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

// service imports
import { DynamoDBModule } from '@services/aws_dynamodb/dynamodb.module';
import { StripeModule } from '@services/stripe/stripe.module';
import { EmailModule } from '@services/sendgrid_email/email.module';

// module imports
import { CoursesModule } from '@modules/courses/courses.module';
import { AuthModule } from '@modules/auth/auth.module';
import { PurchasesModule } from '@modules/purchases/purchases.module';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    CoursesModule,
    EmailModule,
    StripeModule,
    AuthModule,
    DynamoDBModule,
    PurchasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
