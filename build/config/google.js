"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const authentication_service_1 = __importDefault(require("../authentication/authentication.service"));
const googleauth_service_1 = __importDefault(require("../googleauth/googleauth.service"));
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
    const googleAuthService = new googleauth_service_1.default();
    const authService = new authentication_service_1.default();
    try {
        const currentUser = await user_model_1.default.findOne({ googleId: profile.id });
        if (currentUser) {
            const token = authService.createToken(currentUser);
            const cookie = authService.createCookie(token);
            return done(null, { currentUser, token, cookie });
        }
        else {
            const user = await user_model_1.default.create(newUser);
            const token = authService.createToken(user);
            const cookie = authService.createCookie(token);
            return done(null, { user, token, cookie });
        }
    }
    catch (error) {
        return done(error, false);
    }
}));
