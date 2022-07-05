import mongoose from "mongoose";

const variationSchema = new mongoose.Schema({});

const VariationModel = mongoose.model<mongoose.Document>(
  "variation",
  variationSchema
);

export default VariationModel;
