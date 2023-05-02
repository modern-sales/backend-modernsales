import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import config from './config';

@Injectable()
export class DynamoDBService {
  private readonly client: DynamoDB;
  private readonly documentClient: DynamoDB.DocumentClient;

  constructor() {
    this.client = new DynamoDB({
      region: config.aws.region,
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.secretAccessKey,
    });

    this.documentClient = new DynamoDB.DocumentClient({
      service: this.client,
    });
  }

  getClient(): DynamoDB {
    return this.client;
  }

  getDocumentClient(): DynamoDB.DocumentClient {
    return this.documentClient;
  }
}