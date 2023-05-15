import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from '@modules/users/users.module';
import { CoursesModule } from '@modules/courses/courses.module';
import { EmailModule } from '@services/aws_ses/email.module';
import { StripeModule } from '@services/stripe/stripe.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    CoursesModule,
    EmailModule,
    StripeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
