import passport from "passport";
import passportGoogleOAuth from "passport-google-oauth20";
import AuthenticationService from "../authentication/authentication.service";
import GoogleAuthService from "../googleauth/googleauth.service";
import UserModel from "../user/user.model";

const googleStrategy = passportGoogleOAuth.Strategy;

passport.use(
  new googleStrategy(
    {
      callbackURL: process.env.CALLBACK_URL,
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) => {
      const newUser = {
        googleId: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profilePhoto: profile.photos[0].value,
        source: "google",
      };

      const googleAuthService = new GoogleAuthService();
      const authService = new AuthenticationService();
      try {
        const currentUser = await UserModel.findOne({ googleId: profile.id });
        if (currentUser) {
          const token = authService.createToken(currentUser);
          const cookie = authService.createCookie(token);
          return done(null, { currentUser, token, cookie });
        } else {
          const user = await UserModel.create(newUser);
          const token = authService.createToken(user);
          const cookie = authService.createCookie(token);
          return done(null, { user, token, cookie });
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
