import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DynamoDBService } from '@services/aws_dynamodb/dynamodb.service';

const session = require('express-session');
const ConnectDynamoDB = require('connect-dynamodb');

dotenv.config({ path: '.env.local' });
const port = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const dynamoDBService = app.get(DynamoDBService);
  const rawClient = dynamoDBService.getRawClient();

  const DynamoDBStore = ConnectDynamoDB(session);
  app.use(
    session({
      store: new DynamoDBStore({
        client: rawClient,
        table: 'your-session-table',
      }),
      secret: 'your-session-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 86400000 }, // 1 day
    }),
  );
  const allowedOrigins = [
    'http://localhost:3000',
    'https://www.modernsales.xyz',
  ];

  app.enableCors({
    origin: (origin, callback) => {   
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    credentials: true,
  });

  await app.listen(port).then(async () => {
    console.log(`\x1b[36m================================\x1b[0m`);
    console.log(`\x1b[1mServer started on port \x1b[36m${port}!\x1b[0m`);
    console.log(`\x1b[36m================================\x1b[0m`);
  });
}
bootstrap();
