import IUser from "../user/user.interface";
import UserModel from "../user/user.model";

class GoogleAuthService {
  usermodel = UserModel;
  constructor() {}

  addGoogleUser = async ({ ...userData }) => {
    const { googleId, email, firstName, lastName, profilePhoto } = userData;
    const user = new this.usermodel({
      googleId,
      email,
      firstName,
      lastName,
      profilePhoto,
      source: "google",
    });
    return await user.save();
  };

  getUsers = async () => {
    return await this.usermodel.find().lean();
  };

  getUserByEmail = async (email: string) => {
    return await this.usermodel.findOne({ email }).lean();
  };
}

export default GoogleAuthService;
