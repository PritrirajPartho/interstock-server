/*
 * Title: Password Utils
 * Description: All the password utils functions are here
 * Author: Joy Sarkar
 * Date: 30-Nov-2023
 */

const bcrypt = require("bcrypt");

// Hash the user's password
const hashPassword = async (password) => {
  const saltRounds = 10; // You can adjust the number of salt rounds as needed
  return bcrypt.hash(password, saltRounds);
};

// Compare a plain text password with a hashed password
const comparePassword = async (plainTextPassword, hashedPassword) => {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
