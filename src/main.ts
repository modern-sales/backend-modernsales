import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT), () => console.log(`Server started on port ${PORT}`);
}
bootstrap();
