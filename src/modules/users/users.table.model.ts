import {
  CreateTableCommand,
  CreateTableCommandInput,
} from '@aws-sdk/client-dynamodb';
import { DynamoDBService } from '@services/aws_dynamodb/dynamodb.service';

const userTableParams: CreateTableCommandInput = {
  TableName: 'Users',
  KeySchema: [
    {
      AttributeName: 'PK',
      KeyType: 'HASH',
    },
    {
      AttributeName: 'SK',
      KeyType: 'RANGE',
    },
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'PK',
      AttributeType: 'S',
    },
    {
      AttributeName: 'SK',
      AttributeType: 'S',
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 2,
    WriteCapacityUnits: 2,
  },
};

const command = new CreateTableCommand(userTableParams);
const dynamoDBService = new DynamoDBService();
const client = dynamoDBService.getClient();

(async () => {
  try {
    const data = await client.send(command);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
})();
