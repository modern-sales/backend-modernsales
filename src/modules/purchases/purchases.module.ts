import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { DynamoDBModule } from '@services/aws_dynamodb/dynamodb.module'; // import DynamoDBModule
import { StripeService } from '@services/stripe/stripe.service';

@Module({
  imports: [DynamoDBModule], // add DynamoDBModule to imports array
  providers: [PurchasesService, StripeService],
  controllers: [PurchasesController],
})
export class PurchasesModule {}
