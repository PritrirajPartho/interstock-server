/*
 * Title: Bedrijf Model
 * Description: Bedrijf Model for this application defined in this file
 * Author: Joy Sarkar
 * Date: 02-Dec-2023
 */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const bedrijfSchema = new Schema(
  {
    bedrijfsNaam: {
      type: String,
      required: true,
      trim: true,
    },
    soortBedrijf: {
      type: String,
      required: true,
      trim: true,
    },
    telefoonnummer: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    adres: {
      type: String,
      required: true,
      trim: true,
    },
    land: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Bedrijf = mongoose.model("Bedrijf", bedrijfSchema);

module.exports = Bedrijf;
