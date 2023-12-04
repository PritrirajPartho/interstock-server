/*
 * Title: Routes
 * Description: All routes of Bedrijf for this application
 * Author: Joy Sarkar
 * Date: 30-Nov-2023
 */

const express = require("express");
const router = express.Router();
const {
  createBedrijfController,
  updateBedrijfController,
  getAllBedrijfController,
  getBedrijfByIdController,
  getBedrijfByLandNameController,
  deleteBedrijfController,
} = require("../controllers/BedrijfController");
const authMiddleware = require("../middleware/authMiddleware");

// Bedrijf related routes
router.post("/bedrijven", authMiddleware, createBedrijfController);
router.post("/bedrijven/:id", authMiddleware, updateBedrijfController);
router.get("/bedrijven", authMiddleware, getAllBedrijfController);
router.get(
  "/bedrijven/land/:landName",
  authMiddleware,
  getBedrijfByLandNameController
);
router.get("/bedrijven/:id", authMiddleware, getBedrijfByIdController);
router.delete("/bedrijven/:id", authMiddleware, deleteBedrijfController);

module.exports = router;
