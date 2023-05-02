import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DynamoDBService } from '../database/dynamodb.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, DynamoDBService],
})
export class UsersModule {}
