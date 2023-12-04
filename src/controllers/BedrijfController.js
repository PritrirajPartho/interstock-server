/*
 * Title: Bedrijf Controller
 * Description: All the bedrijf controller of this application in this file
 * Author: Joy Sarkar
 * Date: 02-Dec-2023
 */

const {
  createBedrijfService,
  updateBedrijfService,
  getAllBedrijfService,
  getBedrijfByIdService,
  getBedrijfByLandNameService,
  deleteBedrijfService,
} = require("../services/bedrijfServices");

// Create bedrijf controller
exports.createBedrijfController = async (req, res) => {
  const result = await createBedrijfService(req);
  return res.status(200).send(result);
};

// Update bedrijf controller
exports.updateBedrijfController = async (req, res) => {
  const result = await updateBedrijfService(req);
  return res.status(200).send(result);
};

// Get all bedrijven controller
exports.getAllBedrijfController = async (req, res) => {
  const result = await getAllBedrijfService(req);
  return res.status(200).send(result);
};

// Get single bedrijf controller by ID
exports.getBedrijfByIdController = async (req, res) => {
  const result = await getBedrijfByIdService(req);
  return res.status(200).send(result);
};

// Get bedrijf controller by land name
exports.getBedrijfByLandNameController = async (req, res) => {
  const result = await getBedrijfByLandNameService(req);
  return res.status(200).send(result);
};

// Delete bedrijf controller
exports.deleteBedrijfController = async (req, res) => {
  const result = await deleteBedrijfService(req);
  return res.status(200).send(result);
};
