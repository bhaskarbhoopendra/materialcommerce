import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  addressType: { enum: ["billing", "shipping"] },
  city: String,
  country: String,
  street: String,
  pincode: Number,
  phoneNumber: Number,
});

const vendorSchema = new mongoose.Schema({
  address: addressSchema,
  firstName: String,
  lastName: String,
  email: String,
  organization: String,
  company: String,
  isVendor: Boolean,
  isConfirmedVendor: {
    type: String,
    enum: ["confirmed", "pending"],
    default: "pending",
  },
  password: {
    type: String,
    get: (): undefined => undefined,
  },
  warehouse: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "warehouse",
    },
  ],
  phoneNumber: Number,
});

const VendorModel = mongoose.model<mongoose.Document>("vendor", vendorSchema);

export default VendorModel;
