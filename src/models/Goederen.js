/*
 * Title: Goederen Model
 * Description: Goederen Model of this application defined in this file
 * Author: Joy Sarkar
 * Date: 02-Dec-2023
 */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const goederenSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
    },
    omschrijving: {
      type: String,
      required: true,
      trim: true,
    },
    invoerrecht: {
      type: String,
      required: true,
      trim: true,
    },
    restricties: {
      type: String,
      required: true,
      enum: ["Ja", "Nee"],
    },
    reasonRestricties: {
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

const Goederen = mongoose.model("Goederen", goederenSchema);

module.exports = Goederen;
