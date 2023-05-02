import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { DynamoDBService } from '../database/dynamodb.service';
import { User } from './users.model';

@Injectable()
export class UsersService {
  private readonly tableName: string = 'ms-users';
  constructor(private readonly dynamoDBService: DynamoDBService) {}

  async createUser(user: User): Promise<User> {
    const params: DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: user,
    };

    await this.dynamoDBService.getDocumentClient().put(params).promise();
    return user;
  }

  async getUsers(): Promise<User[]> {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: this.tableName,
    };

    const result = await this.dynamoDBService.getDocumentClient().scan(params).promise();
    return (result.Items as unknown) as User[];
  }
}