/*
 * Title: Goederen Controller
 * Description: All the goederen controller of this application in this file
 * Author: Joy Sarkar
 * Date: 02-Dec-2023
 */

const {
  createGoederenService,
  getAllGoederenService,
  updateGoederenService,
  getGoederenByIdService,
  deleteGoederenService,
} = require("../services/GoederenServices");

// Create goederen controller
exports.createGoederenController = async (req, res) => {
  const result = await createGoederenService(req);
  return res.status(200).send(result);
};

// Update goederen controller
exports.updateGoederenController = async (req, res) => {
  const result = await updateGoederenService(req);
  return res.status(200).send(result);
};

// Get single goederen controller
exports.getAllGoederenController = async (req, res) => {
  const result = await getAllGoederenService(req);
  return res.status(200).send(result);
};

// Get all goederens controller
exports.getGoederenByIdController = async (req, res) => {
  const result = await getGoederenByIdService(req);
  return res.status(200).send(result);
};

// Delete goederen controller
exports.deleteGoederenController = async (req, res) => {
  const result = await deleteGoederenService(req);
  return res.status(200).send(result);
};
