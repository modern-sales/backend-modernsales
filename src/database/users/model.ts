import { CreateTableInput, CreateTableCommand } from '@aws-sdk/client-dynamodb'
import documentClient from '../client';

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

documentClient.send(command).then(res => {
    console.log(res);
}).catch(err => {
    console.log(err);
})