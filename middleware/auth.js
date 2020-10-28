const jwt = require("jsonwebtoken");
// const config = require("config");
const jwtSecret = process.env.jwtSecret;

module.exports = function (req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
