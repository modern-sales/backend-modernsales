// purchases.service.ts
import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '@services/aws_dynamodb/dynamodb.service';
import { StripeService } from '@services/stripe/stripe.service';
import { Purchase } from './models/purchase.model';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';

@Injectable()
export class PurchasesService {
  private readonly tableName: string = process.env.DYNAMODB_PURCHASES_TABLE as string;
  constructor(
    private readonly dynamoDBService: DynamoDBService,
    private readonly stripeService: StripeService,
  ) {}

  async listUserPurchases(userId: string) {
    return
  }

  async getPurchaseById(purchaseId: string): Promise<Purchase | null> {

    const documentClient: DynamoDBDocumentClient = this.dynamoDBService.getDocumentClient();

    const params = {
      TableName: this.tableName,
      Key: {
        purchaseId: purchaseId,
      },
    };

    const result = await documentClient.send(new GetCommand(params));
    console.log(result);

    
    if (result.Item && result.Item.length > 0) {
      return result.Item[0] as Purchase;
    } else {
      return null;
    }
  }

  async createPurchase(userId: string, purchaseId: string, token: string, amount: number) {
    const purchase = await this.stripeService.createCharge(token, amount, purchaseId, userId);
    return purchase;
  }
}
