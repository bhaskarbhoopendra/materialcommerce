import mongoose from "mongoose";
import IPincodeType from "./pinocodetype.interface";

const pincodeTypeSchema = new mongoose.Schema({
  pincodeTypeName: String,
  isSpecialState: { type: Boolean, default: false },
});

const PincodeTypeModel = mongoose.model<IPincodeType & mongoose.Document>(
  "pincodetype",
  pincodeTypeSchema
);

export default PincodeTypeModel;
