/*
 * Title: Bedrijf Service
 * Description: All the Bedrijf services of this application in this file
 * Author: Joy Sarkar
 * Date: 02-Dec-2023
 */

const Bedrijf = require("../models/Bedrijf");

// Create bedrijf service
exports.createBedrijfService = async (req) => {
  try {
    const { bedrijfsNaam, soortBedrijf, telefoonnummer, email, adres, land } =
      req.body;
    const newBedrijf = new Bedrijf({
      bedrijfsNaam,
      soortBedrijf,
      telefoonnummer,
      email,
      adres,
      land,
    });
    const result = await newBedrijf.save();

    return { status: true, data: result };
    return result;
  } catch (error) {
    return { status: false, message: "Something went wrong." };
  }
};

// Update bedrijf service
exports.updateBedrijfService = async (req) => {
  try {
    const { id } = req.params;
    const { bedrijfsNaam, soortBedrijf, telefoonnummer, email, adres, land } =
      req.body;
    const result = await Bedrijf.findByIdAndUpdate(
      id,
      {
        bedrijfsNaam,
        soortBedrijf,
        telefoonnummer,
        email,
        adres,
        land,
      },
      { new: true }
    );
    return { status: true, data: result };
  } catch (error) {
    return { status: false, message: "Something went wrong." };
  }
};

// Get all bedrijven service
exports.getAllBedrijfService = async () => {
  try {
    const result = await Bedrijf.find();
    return { status: true, data: result };
  } catch (error) {
    return { status: false, message: "Something went wrong." };
  }
};

// Get single bedrijf service by ID
exports.getBedrijfByIdService = async (req) => {
  try {
    const { id } = req.params;
    const result = await Bedrijf.findById(id);
    return { status: true, data: result };
  } catch (error) {
    return { status: false, message: "Something went wrong." };
  }
};

// Get single bedrijf service by land name
exports.getBedrijfByLandNameService = async (req) => {
  try {
    const { landName } = req.params;
    const result = await Bedrijf.aggregate([
      {
        $match: {
          land: landName,
        },
      },
    ]);
    return { status: true, data: result };
  } catch (error) {
    return { status: false, message: "Something went wrong." };
  }
};

// Delete bedrijf service
exports.deleteBedrijfService = async (req) => {
  try {
    const { id } = req.params;
    const result = await Bedrijf.findByIdAndDelete(id);
    return { status: true, data: result };
  } catch (error) {
    return { status: false, message: "Something went wrong." };
  }
};
