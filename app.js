const app = require('./ejsapp');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`app is Listening at ${port}`);
});

app.get('/ping', (req, res) => {
  res.status(200);
  res.contentType('text/html');
  res.send('it\'s work!');
});

app.use(require('./router'));
