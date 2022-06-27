import mongoose from "mongoose";
import IFreightRate from "./freigthrate.interface";

const freightRateSchema = new mongoose.Schema({
  zone: String,
  pincodeType: String,
  weightType: {
    type: String,
    enum: ["weight", "volumetricweight"],
    default: "weight",
  },
  lowerbound: Number,
  upperbound: Number,
  rate: Number,
});

const FreightRateModel = mongoose.model<IFreightRate & mongoose.Document>(
  "freightrate",
  freightRateSchema
);

export default FreightRateModel;
