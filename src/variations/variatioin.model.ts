import mongoose from "mongoose";

const variationSchema = new mongoose.Schema({
  varitationName: String,
  property: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "property",
    },
  ],
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});

const VariationModel = mongoose.model<mongoose.Document>(
  "variation",
  variationSchema
);

export default VariationModel;
