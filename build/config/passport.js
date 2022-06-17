"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const user_model_1 = __importDefault(require("../user/user.model"));
passport_1.default.serializeUser((user, done) => {
    return done(null, user);
});
passport_1.default.deserializeUser(async (id, done) => {
    user_model_1.default.findById(id, (err, doc) => {
        // Whatever we return goes to the client and binds to the req.user property
        return done(null, doc);
    });
});
