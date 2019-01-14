const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.listen(port, () => {
  console.log(`app is Listening at ${port}`);
});

app.get('/', (req, res) => {
  res.status(200);
  res.render('index', {
    title: 'index',
    SayHello: 'Hello EC2!!!',
  });
});
