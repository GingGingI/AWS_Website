const dynamoDB = require('../../AWS/AWS');

exports.insert = (res, req) => {
  const params = {
    TableName: 'Music',
    Item: {
      'Artist': 'No One U Know',
      'SongTitle': 'Hi There',
      'AlbumTitle': 'Somewhat Famous',
      'Info': {
        'raging': 0.0,
        'views': 0.0,
      },
    },
  };

  dynamoDB.CreateTable(params);
};
