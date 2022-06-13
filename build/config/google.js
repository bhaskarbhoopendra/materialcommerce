"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const googleauth_service_1 = __importDefault(require("../googleauth/googleauth.service"));
const googleStrategy = passport_google_oauth20_1.default.Strategy;
// console.log(process.env.GOOGLE_CLIENT_ID);
// console.log(passport);
passport_1.default.use(new googleStrategy({
    callbackURL: process.env.CALLBACK_URL,
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, async (accessToken, refreshToken, profile, done) => {
    const id = profile.id;
    const email = profile.emails[0].value;
    const firstName = profile.name.givenName;
    const lastName = profile.name.familyName;
    const profilePhoto = profile.photos[0].value;
    const source = "google";
    const googleAuthService = new googleauth_service_1.default();
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
}));
