import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamoClient = new DynamoDBClient({ 
    region: process.env.AWS_REGION
});

const documentClient = DynamoDBDocumentClient.from(dynamoClient);

export default documentClient;