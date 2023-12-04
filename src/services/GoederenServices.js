/*
 * Title: Goederen Service
 * Description: All the goederen services of this application in this file
 * Author: Joy Sarkar
 * Date: 02-Dec-2023
 */

const Goederen = require("../models/Goederen");

// Create goederen service
exports.createGoederenService = async (req) => {
  try {
    const goederen = new Goederen(req.body);
    const result = await goederen.save();
    return { status: true, data: result };
  } catch (error) {
    return { status: false, error: error.message };
  }
};

// Update goederen service
exports.updateGoederenService = async (req) => {
  try {
    const { id } = req.params;
    const result = await Goederen.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return { status: true, data: result };
  } catch (error) {
    return { status: false, error: error.message };
  }
};

// Get all goederen service
exports.getAllGoederenService = async () => {
  try {
    const result = await Goederen.find();
    return { status: true, data: result };
  } catch (error) {
    return { status: false, error: error.message };
  }
};

// Get single goederen service
exports.getGoederenByIdService = async (req) => {
  try {
    const { id } = req.params;
    const result = await Goederen.findById(id);
    return { status: true, data: result };
  } catch (error) {
    return { status: false, error: error.message };
  }
};

// Delete goederen service
exports.deleteGoederenService = async (req) => {
  try {
    const { id } = req.params;
    const result = await Goederen.findByIdAndDelete(id);
    return { status: true, data: result };
  } catch (error) {
    return { status: false, error: error.message };
  }
};
