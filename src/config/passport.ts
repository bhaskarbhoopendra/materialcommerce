import passport from "passport";
import IUser from "../user/user.interface";
import UserModel from "../user/user.model";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const currentUser = await UserModel.findOne({ id });
  done(null, currentUser);
});
