module.exports = (req, res, next) => {
  res.header('Test', 'OK');
  next();
};
