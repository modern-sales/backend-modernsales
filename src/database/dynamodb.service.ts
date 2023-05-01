import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import config from './config';

@Injectable()
export class DynamoDBService {
  private readonly dynamoDB: DynamoDB.DocumentClient;

  constructor() {
    this.dynamoDB = new DynamoDB.DocumentClient({
      region: config.aws.region,
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.secretAccessKey,
    });
  }

  getClient(): DynamoDB.DocumentClient {
    return this.dynamoDB;
  }
}