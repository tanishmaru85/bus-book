const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifyToken = async (req, res, next) => {
const token = req.header('Authorization');
    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }
    try {
      const decoded = jwt.verify(token, config.secret_jwt);
      req.id = decoded.id;
      
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }

    return next();
};

module.exports = verifyToken;