const AWS = require('aws-sdk');

AWS.config.update({
  region: 'ap-southeast-1',
  endpoint: 'http://localhost:1818', // AWS.config.update({endpoint: "https://dynamodb.ap-southeast-1.amazonaws.com"}); // for production
});

const dynamoCore = new AWS.DynamoDB();
const dynamoDocument = new AWS.DynamoDB.DocumentClient();

module.exports = {
  dynamoDocument,
  dynamoCore,
};
