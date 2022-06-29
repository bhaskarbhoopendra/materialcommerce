import mongoose from "mongoose";

const freightRateSchema = new mongoose.Schema({
  pincodetype: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pincodetype",
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "zone",
  },
  weightType: String,
  upperbound: Number,
  lowerbound: Number,
  rate: Number,
});

const FreightRateModel = mongoose.model<mongoose.Document>(
  "freightrate",
  freightRateSchema
);

export default FreightRateModel;
