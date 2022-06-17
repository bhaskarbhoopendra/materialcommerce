import passport from "passport";
import IUser from "../user/user.interface";
import UserModel from "../user/user.model";

passport.serializeUser((user, done: any) => {
  return done(null, user);
});

passport.deserializeUser(async (id: string, done: any) => {
  UserModel.findById(id, (err: Error, doc: IUser) => {
    // Whatever we return goes to the client and binds to the req.user property
    return done(null, doc);
  });
});
