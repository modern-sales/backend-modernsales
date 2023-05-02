import { CreateTableInput, CreateTableCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBService } from '../dynamodb.service';

const userTableParams: CreateTableInput = {
    TableName: 'Users',
    KeySchema: [
        {
            AttributeName: 'PK',
            KeyType: 'HASH'
        },
        {
            AttributeName: 'SK',
            KeyType: 'RANGE'
        }
    ],
    AttributeDefinitions: [
        {
            AttributeName: 'PK',
            AttributeType: 'S'
        },
        {
            AttributeName: 'SK',
            AttributeType: 'S'
        },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2
    },
}

const command = new CreateTableCommand(userTableParams);
const dynamoDBService = new DynamoDBService();
const client = dynamoDBService.getClient();


client.createTable(userTableParams, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });