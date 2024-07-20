const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifyToken = async (req, res, next) => {
const token = req.header('Authorization');
    if (!token) {
       res.status(400).json({ message: 'No token provided' });
    }
    try {
      const decoded = jwt.verify(token, config.secret_jwt);
      req.id = decoded.id;
      next();
      
    } catch (error) {
      if(error.name === 'jsonWebTokenError'){

        res.status(400).json({ message: 'Invalid token' });
      }
      console.log('Token verification error',error);
      return res.status(500).json({message:'Server errror'});
    }

};

module.exports = verifyToken;