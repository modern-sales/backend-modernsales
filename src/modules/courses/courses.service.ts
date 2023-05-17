import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '@services/aws_dynamodb/dynamodb.service';
import { Course } from './models/courses.model';
import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class CoursesService {
  private readonly tableName: string = 'ms-courses';
  constructor(private readonly dynamoDBService: DynamoDBService) {}

  async createCourse(course: Course): Promise<Course> {
    const documentClient: DynamoDBDocumentClient =
      this.dynamoDBService.getDocumentClient();

    const params = {
      TableName: this.tableName,
      Item: course,
    };

    await documentClient.send(new PutCommand(params));
    return course;
  }

  async getCourses(): Promise<Course[]> {
    const documentClient: DynamoDBDocumentClient =
      this.dynamoDBService.getDocumentClient();

    const params = {
      TableName: this.tableName,
    };

    const result = await documentClient.send(new ScanCommand(params));
    return result.Items as Course[];
  }
}
