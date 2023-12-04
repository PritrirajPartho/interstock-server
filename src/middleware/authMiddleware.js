/*
 * Title: Auth Middleware
 * Description: This middleware to verify the user authentication.
 * Author: Joy Sarkar
 * Date: 01-Dec-2023
 */

const { verifyToken } = require("../utils/jwtUtils");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized - Token missing or invalid.",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "Unauthorized - Token missing." });
  }

  const userId = verifyToken(token);

  if (!userId) {
    return res
      .status(401)
      .json({ status: false, message: "Unauthorized - Invalid token." });
  }

  try {
    // Fetch user details based on the userId from the token, including only specific fields
    const user = await User.findById(userId, "name email role");

    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized - User not found." });
    }

    // Attach user details to the request for further processing
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error." });
  }
};

module.exports = authMiddleware;
