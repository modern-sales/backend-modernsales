import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { DynamoDBService } from '@services/aws_dynamodb/dynamodb.service';

@Module({
  imports: [],
  controllers: [CoursesController],
  providers: [CoursesService, DynamoDBService],
})
export class CoursesModule {}
