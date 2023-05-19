import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '@services/aws_dynamodb/dynamodb.service';
import { Course } from './models/course.model';
import { GetCommand, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { CreateCourseDto } from './dtos/create-course.dto';

@Injectable()
export class CoursesService {
  private readonly tableName: string = process.env.DYNAMODB_COURSES_TABLE as string;
  constructor(private readonly dynamoDBService: DynamoDBService) { }

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const documentClient: DynamoDBDocumentClient = this.dynamoDBService.getDocumentClient();

    if (!createCourseDto.title || !createCourseDto.description || !createCourseDto.modules || !createCourseDto.basePrice || !createCourseDto.discountPrice) {
      throw new Error('Missing required fields!');
    }

    // Convert the DTO to the Course model
    const course: Course = {
      _id: uuidv4(),
      title: createCourseDto.title,
      description: createCourseDto.description,
      basePrice: createCourseDto.basePrice,
      discountPrice: createCourseDto.discountPrice,
      modules: createCourseDto.modules,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const params = {
      TableName: this.tableName,
      Item: course,
    };

    await documentClient.send(new PutCommand(params));
    return course;
  }

  async getCourses(): Promise<Course[]> {
    const documentClient: DynamoDBDocumentClient = this.dynamoDBService.getDocumentClient();

    const params = {
      TableName: this.tableName,
    };

    const result = await documentClient.send(new ScanCommand(params));
    return result.Items as Course[];
  }

  async getCourseById(courseId: string): Promise<Course | null> {

    const documentClient: DynamoDBDocumentClient = this.dynamoDBService.getDocumentClient();

    const params = {
      TableName: this.tableName,
      Key: {
        courseId: courseId,
      },
    };

    const result = await documentClient.send(new GetCommand(params));
    console.log(result);
    console.log(`==================== that is course above`)

    if (result.Item && result.Item.length > 0) {
      return result.Item[0] as Course;
    } else {
      return null;
    }
  }
}
