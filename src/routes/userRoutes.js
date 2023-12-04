/*
 * Title: Routes
 * Description: All routes of User this application
 * Author: Joy Sarkar
 * Date: 30-Nov-2023
 */

const express = require("express");
const router = express.Router();
const {
  createOrUpdateUserController,
  getAllUsersController,
  getUserByIdController,
  deleteUserController,
  forgotPasswordController,
  resetPasswordController,
  loginController,
} = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");

// User related routes
router.post("/user", authMiddleware, createOrUpdateUserController);
router.get("/users", authMiddleware, getAllUsersController);
router.get("/user/:id", authMiddleware, getUserByIdController);
router.delete("/user/:id", authMiddleware, deleteUserController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);

module.exports = router;
