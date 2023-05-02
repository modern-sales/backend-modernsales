import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '../database/dynamodb.service';
import { User } from './users.model';
import { PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class UsersService {
  private readonly tableName: string = 'ms-users';
  constructor(private readonly dynamoDBService: DynamoDBService) {}

  async createUser(user: User): Promise<User> {
    const documentClient: DynamoDBDocumentClient =
      this.dynamoDBService.getDocumentClient();

    const params = {
      TableName: this.tableName,
      Item: user,
    };

    await documentClient.send(new PutCommand(params));
    return user;
  }

  async getUsers(): Promise<User[]> {
    const documentClient: DynamoDBDocumentClient =
      this.dynamoDBService.getDocumentClient();

    const params = {
      TableName: this.tableName,
    };

    const result = await documentClient.send(new ScanCommand(params));
    return result.Items as User[];
  }
}
