// dynamodb.service.ts
import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { dynamoDBConfig } from '@config/app.config';

@Injectable()
export class DynamoDBService {
  private readonly client: DynamoDBClient;
  private readonly documentClient: DynamoDBDocumentClient;
  private readonly rawClient: DynamoDB;

  constructor() {
    this.client = new DynamoDBClient(dynamoDBConfig);
    this.documentClient = DynamoDBDocumentClient.from(this.client);
    this.rawClient = new DynamoDB(this.client);
  }

  getClient(): DynamoDBClient {
    return this.client;
  }

  getDocumentClient(): DynamoDBDocumentClient {
    return this.documentClient;
  }

  getRawClient(): DynamoDB {
    return this.rawClient;
  }
}
