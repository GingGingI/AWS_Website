const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.listen(port, () => {
  console.log(`app is Listening at ${port}`);
});

app.get('/ping', (req, res) => {
  res.status(200);
  res.contentType('text/html');
  res.send('it\'s work!');
});

require('./router/index')(app);
