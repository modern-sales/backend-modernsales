export const dynamoDBConfig = {
  accessKeyId: process.env.AWS_DYNAMODB_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_DYNAMODB_SECRET_ACCESS_KEY,
  region: process.env.AWS_DYNAMODB_REGION,
};

export const s3Config = {
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION,
};