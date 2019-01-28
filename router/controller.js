module.exports = (req, res) => {
  res.status(200);
  res.render('index', {
    title: 'index',
    SayHello: 'Hello EC2!!!',
  });
};
