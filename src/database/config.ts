import * as dotenv from 'dotenv';

dotenv.config();

export default {
  aws: {
    region: process.env.AWS_DYNAMODB_REGION,
    accessKeyId: process.env.AWS_DYNAMODB_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_DYNAMODB_SECRET_ACCESS_KEY,
  },
};