import mongoose from "mongoose";

const propertyShema = new mongoose.Schema({
  propertyname: String,
});

const PropertyModel = mongoose.model<mongoose.Document>(
  "property",
  propertyShema
);

export default PropertyModel;
