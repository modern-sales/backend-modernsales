import { Injectable } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import config from './config';

@Injectable()
export class DynamoDBService {
  private readonly client: DynamoDBClient;
  private readonly documentClient: DynamoDBDocumentClient;

  constructor() {
    this.client = new DynamoDBClient({
      region: config.aws.region,
      credentials: {
        accessKeyId: config.aws.accessKeyId as string,
        secretAccessKey: config.aws.secretAccessKey as string,
      },
    });

    this.documentClient = DynamoDBDocumentClient.from(this.client);
  }

  getClient(): DynamoDBClient {
    return this.client;
  }

  getDocumentClient(): DynamoDBDocumentClient {
    return this.documentClient;
  }
}
