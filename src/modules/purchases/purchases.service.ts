import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '@services/aws_dynamodb/dynamodb.service';

@Injectable()
export class PurchasesService {
  constructor(private readonly dynamoDBService: DynamoDBService) {}

  async listUserPurchases(userId: string) {
    // Use DynamoDBService to fetch and return all purchases for the given user
  }

  async getPurchase(purchaseId: string) {
    // Use DynamoDBService to fetch and return data for the given purchase
  }

  async createPurchase(userId: string, courseId: string, token: string, amount: number) {
    // Use StripeService to create a charge and record the transaction
    // Use DynamoDBService to record the purchase
  }
}
