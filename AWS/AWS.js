const AWS = require('aws-sdk');

const dynamodb = AWS.DynamoDB.DocumentClient();

AWS.config.update({
  region: 'ap-northeast-2',
  endpoint: 'http://localhost:8000',
});

var params = {
  TableName: 'Movies',
  KeyConditionExpression: '#yt = yyyy'
}