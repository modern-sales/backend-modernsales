import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { DynamoDBService } from '../database/dynamodb.service';
import { Course } from './courses.model';

@Injectable()
export class CoursesService {
  private readonly tableName: string = 'ms-courses';
  constructor(private readonly dynamoDBService: DynamoDBService) {}

  async createCourse(course: Course): Promise<Course> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: course,
    };

    await this.dynamoDBService.getDocumentClient().put(params).promise();
    return course;
  }

  async getCourses(): Promise<Course[]> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName,
    };

    const result = await this.dynamoDBService.getDocumentClient().scan(params).promise();
    return (result.Items as unknown) as Course[];
  }
}