import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';

import { VerifyTokenMiddleware } from './middleware/verify-token.middleware';
import { VerifyTokenAndAuthMiddleware } from './middleware/verify-token-and-auth.middleware';
import { VerifyTokenAndAdminMiddleware } from './middleware/verify-token-and-admin.middleware';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    CoursesModule,
    AuthModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        VerifyTokenMiddleware,
        VerifyTokenAndAuthMiddleware,
        VerifyTokenAndAdminMiddleware,
      )
      .forRoutes(
        { path: '/protected', method: RequestMethod.ALL },
        // Add more protected routes here...
      );
  }
}
