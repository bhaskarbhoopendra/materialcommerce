import mongoose from "mongoose";
import IUser from "./user.interface";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    default: null,
  },
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  source: { type: String },
  lastVisited: { type: Date, default: new Date() }
});

export const addressSchema = new mongoose.Schema({
  city: String,
  country: String,
  street: String,
  pincode: Number,
  phoneNumber: Number,
})


const UserModel = mongoose.model<IUser & mongoose.Document>("user", userSchema);

export default UserModel;

//source: { type: String, required: [true, "Source not specified"] },
