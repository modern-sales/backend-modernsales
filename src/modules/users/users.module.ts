import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DynamoDBService } from '@services/aws_dynamodb/dynamodb.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, DynamoDBService],
  exports: [UsersService], // Make sure to export UsersService here
})
export class UsersModule {}