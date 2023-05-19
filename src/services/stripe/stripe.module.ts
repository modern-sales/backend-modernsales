import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { DynamoDBModule } from '@services/aws_dynamodb/dynamodb.module';

@Module({
  imports: [DynamoDBModule],  // Import the module here
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule {}