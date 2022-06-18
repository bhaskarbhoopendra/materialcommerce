import mongoose from "mongoose";
import IZone from "./zone.interface";

const zoneSchema = new mongoose.Schema({
  zoneName: String,
  minimumDistance: Number,
  maximumDistance: Number,
});

const ZoneModel = mongoose.model<IZone & mongoose.Document>("zone", zoneSchema);

export default ZoneModel;
