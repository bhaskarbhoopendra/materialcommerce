import mongoose from "mongoose";

const variationSchema = new mongoose.Schema({
  varitationName: String,
});

const VariationModel = mongoose.model<mongoose.Document>(
  "variation",
  variationSchema
);

export default VariationModel;
