const AWS = require('aws-sdk');

const dynamodb = AWS.DynamoDB();
const docClient = AWS.DynamoDB.DocumentClient();

AWS.config.update({
  region: 'ap-northeast-2',
  endpoint: 'https://dynamodb.ap-northeast-2.amazonaws.com',
});

// if (err) return (err, null);
// return (null, data);

exports.CreateTable = (params) => {
  dynamodb.createTable(params, (err, data) => {
    if (err) console.error('unable to create table. ERR Json =>', JSON.stringify(err, null, 2));
    else console.log('Create table. Table description Json =>', JSON.stringify(data, null, 2));
  });
};

exports.InsertData = (params) => {
  docClient.put(params, (err, data) => {
    if (err) console.error('unable to add Song. Error Json =>', JSON.stringify(err, null, 2));
    else console.log('Item put succeeded =>', JSON.stringify(data, null, 2));
  });
};

exports.UpdateData = (params) => {
  docClient.update(params, (err, data) => {
    if (err) console.error('unable to update item. Error Json =>', JSON.stringify(err, null, 2));
    else console.log('Item Update succeeded =>', JSON.stringify(data, null, 2));
  });
};

exports.RemoveData = (params) => {
  docClient.update(params, (err, data) => {
    if (err) console.error('unable to remove item. Error Json =>', JSON.stringify(err, null, 2));
    else console.log('Item Remove succeeded =>', JSON.stringify(data, null, 2));
  });
};

exports.dataQuery = (params) => {
  docClient.query(params, (err, data) => {
    if (err) console.error('Unable to query. Error =>', JSON.stringify(err, null, 2));
    else {
      console.log('Query Succeeded');
      data.Items.forEach((item) => {
        console.log(' - ', `${item.Artist} : ${item.SongTitle}`);
      });
    }
  });
};

exports.dataScan = (params) => {
  docClient.scan(params, (err, data) => {
    if (err) console.error('Unable to scan the table. Error Json =>', JSON.stringify(err, null, 2));
    else {
      data.Items.forEach((item) => {
        console.log(`${item.Artist} : ${item.SongTitle} - ${item.info.rating}`);
      });

      if (typeof data.LastEvaluatedKey !== 'undefined') {
        console.log('scanning for ...');
        params.ExclusiveStartKey = data.LastEvaluatedKey;
        docClient.scan(params, this);
      }
    }
  });
};

exports.deleteTable = (params) => {
  dynamodb.deleteTable(params, (err, data) => {
    if (err) console.error('Unable to delete table. Error Json =>', JSON.stringify(err, null, 2));
    else console.log('Deleted table. Table decription Json =>', JSON.stringify(data, null, 2));
  });
};

/** Example params for Create Table */
// const params = {
//   TableName: 'Music',
//   KeySchema: [
//     { AttributeName: 'Artist', KeyType: 'HASH' },
//   ],
//   AttributeDefinitions: [
//     { AttributeName: 'Artist', AttributeType: 'S' },
//     { AttributeName: 'SongTitle', AttributeType: 'S' },
//     { AttributeName: 'AlbumTitle', AttributeType: 'S' },
//   ],
//   ProvisionedThroughput: {
//     ReadCapcityUnits: 10,
//     WriteCapcityUnits: 10,
//   },
// };

/** Example params for Insert data */
// const params = {
//   TableName: 'Music',
//   Item: {
//     'Artist': Music.Artist,
//     'SongTitle': Music.SongTitle,
//     'AlbumTitle': Music.AlbumTitle,
//   }
// }

/** Example params for Update data */
// const params = {
//   TableName: 'Music',
//   Key: {
//     'Artist': 'No One U Know',
//     'SongTitle': 'Call Me Today',
//   },
//   UpdateExpression: 'set info.rating = :r, info.views = :v',
//   ExpressionAttributeValues: {
//     ':r': 3.5,
//     ':v': 64,
//   },
//   ReturnValues: 'UPDATED_NEW',
// };

/** Example params for Atomic count */
// const params = {
//   TableName: 'Music',
//   Key: {
//     'Artist': 'No One U Know',
//     'SongTitle': 'Call Me Today',
//   },
//   UpdateExpression: 'set info.views = info.views + :v',
//   ExpressionAttributeValues: {
//     ':v': 1,
//   },
//   ReturnValues: 'UPDATED_NEW',
// };

/** Example params for update when condition matches */
// const params = {
//   TableName: 'Music',
//   Key: {
//     'Artist': 'No One U Know',
//     'SongTitle': 'Call Me Today',
//   },
//   UpdateExpression: 'set info.views = 0',
//   ConditionExpression: 'size(info.views) < :v',
//   ExpressionAttributeValues: {
//     ':v': 100,
//   },
//   ReturnValues: 'UPDATED_NOW',
// };


/** Example params for remove with condition */
// const params = {
//   TableName: 'Music',
//   Key: {
//     'Artist': 'No One U Know',
//     'SongTitle': 'Call Me Today',
//   },
//   ConditionExpression: 'info.rating <= :r',
//   ExpressionAttributeValues: {
//     ':r': 1.0,
//   },
// };

/** Example params for remove without condition */
// const params = {
//   TableName: 'Music',
//   Key: {
//     'Artist': 'No One U Know',
//     'SongTitle': 'Call Me Today',
//   },
// };

/** Example params for query data */
// const params = {
//   TableName: 'Music',
//   KeyConditionExpression: '#artist = :artist',
//   ExpressionAttributeName: {
//     '#artist': 'Artist',
//   },
//   ExpressionAttributeValues: {
//     ':artist': 'No One U Know',
//   },
// };

// const params = {
//   TableName: 'Music',
//   ProjectExpression: '#artist, info.rating',
//   FilterExpression: '#artist = :artist and info.rating > :r',
//   ExpressionAttributeName: {
//     '#artist': 'Artist',
//   },
//   ExpressionAttributeValues: {
//     ':artist': 'No One U Know',
//     ':r': 1.0,
//   },
// };

// const params = {
//   TableName: 'Music',
// };
