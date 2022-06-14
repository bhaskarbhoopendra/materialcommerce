"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const user_model_1 = __importDefault(require("../user/user.model"));
const googleStrategy = passport_google_oauth20_1.default.Strategy;
passport_1.default.use(new googleStrategy({
    callbackURL: process.env.CALLBACK_URL,
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, async (accessToken, refreshToken, profile, done) => {
    const newUser = {
        googleId: profile.id,
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profilePhoto: profile.photos[0].value,
        source: "google",
    };
    //   const googleAuthService = new GoogleAuthService();
    try {
        const currentUser = await user_model_1.default.findOne({ googleId: profile.id });
        if (currentUser)
            done(null, currentUser);
        const user = await user_model_1.default.create(newUser);
        done(null, user);
    }
    catch (error) {
        done(error, false);
    }
}));
