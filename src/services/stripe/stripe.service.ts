import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';
import { DynamoDBService } from '@services/aws_dynamodb/dynamodb.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(private readonly dynamoDBService: DynamoDBService) {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });
    }

    async createCharge(token: string, amount: number, courseId: string, userId: string) {
        const documentClient: DynamoDBDocumentClient = this.dynamoDBService.getDocumentClient();

        try {
            const charge = await this.stripe.charges.create({
                amount, // Amount should be in cents
                currency: 'usd',
                source: token,
                description: `Charge for course ${courseId}`,
            });

            // Save transaction in DynamoDB
            // You'll want to design a suitable structure for your transactions
            const purchase = {
                userId,
                courseId,
                chargeId: charge.id,
                amount: charge.amount,
                created: charge.created,
                // ... any other data you're interested in
            };

            // create put commands for putting the transaction into dynamodb
            const params = {
                TableName: process.env.DYNAMODB_PURCHASES_TABLE,
                Item: purchase,
            };

            // Assuming you have a method in DynamoDBService to put an item
            await documentClient.send(new PutCommand(params));
            return purchase;
        } catch (error) {
            console.error(error);
            // Handle error, potentially throw it so it can be caught further up
        }
    }
}
