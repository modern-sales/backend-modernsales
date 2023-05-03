import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { dynamoDBConfig } from 'src/config/app.config';

@Injectable()
export class DynamoDBService {
  private readonly client: DynamoDBClient;
  private readonly documentClient: DynamoDBDocumentClient;

  constructor() {
    this.client = new DynamoDBClient(dynamoDBConfig);

    this.documentClient = DynamoDBDocumentClient.from(this.client);
  }

  getClient(): DynamoDBClient {
    return this.client;
  }

  getDocumentClient(): DynamoDBDocumentClient {
    return this.documentClient;
  }
}
