/*
 * Title: Route
 * Description: Login Route
 * Author: Joy Sarkar
 * Date: 30-Nov-2023
 */

const express = require("express");
const { loginController } = require("../controllers/UserController");
const router = express.Router();

// User login route
router.post("/login", loginController);

module.exports = router;
