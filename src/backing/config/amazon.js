const aws = require("aws-sdk");

const accessKeyId = process.env.AWS_ID_KEY;
const region = process.env.AWS_REGION;
const secretAccessKey = process.env.AWS_SECRET_KEY;

aws.config.update({
  accessKeyId,
  region,
  secretAccessKey
});

const S3 = new aws.S3();
const SNS = new aws.SNS();
const SQS = new aws.SQS();

export { S3, SNS, SQS };
