module.exports = (req, res, next) => {
  res.header('Sample-Header', 'some value');
  next();
};
