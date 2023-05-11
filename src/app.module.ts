import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { UsersModule } from '@modules/users/users.module';
import { CoursesModule } from '@modules/courses/courses.module';
import { AuthModule } from '@modules/auth/auth.module';

import { EmailModule } from '@services/aws_ses/email.module';
import { StripeModule } from '@services/stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    CoursesModule,
    AuthModule,
    EmailModule,
    StripeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes(
        { path: '/protected', method: RequestMethod.ALL },
        // Add more protected routes here...
      );
  }
}
