import mongoose from "mongoose";
import IUser from "./user.interface";

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    default: null,
  },
  email: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  source: { type: String, required: [true, "Source not specified"] },
  lastVisited: { type: Date, default: new Date() },
});

const UserModel = mongoose.model<IUser & mongoose.Document>("user", userSchema);

export default UserModel;
