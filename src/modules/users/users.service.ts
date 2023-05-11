import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '@services/aws_dynamodb/dynamodb.service';
import { User } from './users.model';
import { PutCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class UsersService {
  private readonly tableName: string = 'ms-users';
  constructor(private readonly dynamoDBService: DynamoDBService) { }

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

  async findUserByEmail(email: string): Promise<User | null> {
    const documentClient: DynamoDBDocumentClient = this.dynamoDBService.getDocumentClient();

    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'primary_email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };

    const result = await documentClient.send(new QueryCommand(params));
    console.log(result);

    if (result.Items && result.Items.length > 0) {
      return result.Items[0] as User;
    } else {
      return null;
    }
  }

}
