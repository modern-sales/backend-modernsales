import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '@services/aws_dynamodb/dynamodb.service';
import { User } from './models/user.model';
import {
  PutCommand,
  QueryCommand,
  ScanCommand,
  DeleteCommand, // Add this import
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private readonly tableName: string = 'ms-users';
  constructor(private readonly dynamoDBService: DynamoDBService) {}

  async createUser(email: string, name: string): Promise<User> {
    const documentClient: DynamoDBDocumentClient =
      this.dynamoDBService.getDocumentClient();

    const userId = uuidv4();

    // Build a new User object
    const user: User = {
      _id: userId,
      email: email,
      name: name,
      staltedOTP: '',
      OTPExpiration: new Date(),
    };

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
    const documentClient: DynamoDBDocumentClient =
      this.dynamoDBService.getDocumentClient();

    const params = {
      TableName: this.tableName,
      KeyConditionExpression: 'primary_email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
    };

    const result = await documentClient.send(new QueryCommand(params));

    if (result.Items && result.Items.length > 0) {
      return result.Items[0] as User;
    } else {
      return null;
    }
  }

  // Add the deleteUser method
  async deleteUser(email: string): Promise<void> {
    const documentClient: DynamoDBDocumentClient =
      this.dynamoDBService.getDocumentClient();

    const params = {
      TableName: this.tableName,
      Key: {
        primary_email: email,
      },
    };

    await documentClient.send(new DeleteCommand(params));
  }
}
