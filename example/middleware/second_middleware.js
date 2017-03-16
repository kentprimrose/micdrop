module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS');
  next();
};
