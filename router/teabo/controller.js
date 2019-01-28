exports.normal = (req, res) => {
  res.status(200);
  res.render('teabo', {
    title: '태보해',
    trainer: '태보 그랜드마스터 조혜련',
  });
};
