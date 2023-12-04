/*
 * Title: Routes
 * Description: All routes of Goederen this application
 * Author: Joy Sarkar
 * Date: 30-Nov-2023
 */

const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createGoederenController,
  updateGoederenController,
  getAllGoederenController,
  getGoederenByIdController,
  deleteGoederenController,
} = require("../controllers/GoeDerenController");

// Goederen related routes
router.post("/goederen", authMiddleware, createGoederenController);
router.post("/goederen/:id", authMiddleware, updateGoederenController);
router.get("/goederens", authMiddleware, getAllGoederenController);
router.get("/goederen/:id", authMiddleware, getGoederenByIdController);
router.delete("/goederen/:id", authMiddleware, deleteGoederenController);

module.exports = router;
