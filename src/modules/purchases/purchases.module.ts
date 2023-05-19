import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { DynamoDBModule } from '@services/aws_dynamodb/dynamodb.module'; // import DynamoDBModule

@Module({
  imports: [DynamoDBModule], // add DynamoDBModule to imports array
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
