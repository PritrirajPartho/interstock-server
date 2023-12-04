// jwtUtils.js

const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign({ userId }, secretKey, { expiresIn: "7d" }); // Adjust the expiration time as needed
  return token;
};

const verifyToken = (token) => {
  const secretKey = process.env.JWT_SECRET_KEY;

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.userId;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
