import passport from "passport";
import passportGoogleOAuth from "passport-google-oauth20";
import GoogleAuthService from "../googleauth/googleauth.service";

const googleStrategy = passportGoogleOAuth.Strategy;
// console.log(process.env.GOOGLE_CLIENT_ID);
// console.log(passport);
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
      const id = profile.id;
      const email = profile.emails[0].value;
      const firstName = profile.name.givenName;
      const lastName = profile.name.familyName;
      const profilePhoto = profile.photos[0].value;
      const source = "google";
      const googleAuthService = new GoogleAuthService();

      const currentUser = await googleAuthService.getUserByEmail(email);

      if (!currentUser) {
        const newUser = await googleAuthService.addGoogleUser({
          id,
          email,
          firstName,
          lastName,
          profilePhoto,
        });
        console.log(newUser);
        return done(null, newUser);
      }

      if (currentUser.source != "google") {
        //return error
        return done(null, false, {
          message: `You have previously signed up with a different signin method`,
        });
      }

      currentUser.lastVisited = new Date();
      console.log("user profile is: ", currentUser);

      //   return done(null, currentUser);
      console.log("user profile is: ", profile);
    }
  )
);
