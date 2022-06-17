"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const jwt = __importStar(require("jsonwebtoken"));
class GoogleAuthController {
    constructor() {
        this.path = "/auth/google";
        this.router = (0, express_1.Router)();
        this.googleCallback = async (request, response) => {
            response.redirect("/http://localhost:3000/googlesuccess");
        };
        this.getUser = async (request, response) => {
            console.log(request.user);
            response.send(request.user);
        };
        this.googleLogout = async (request, response, next) => {
            // request.logout((error) => {
            //   if (error) return next(error);
            //   response.send("LoggedOUt");
            // });
            if (request.user) {
                request.logout((error) => {
                    if (error)
                        return next(error);
                    response.send("LoggedOUt");
                });
            }
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, passport_1.default.authenticate("google", {
            scope: ["email", "profile"],
        }));
        this.router.get(`${this.path}/callback`, passport_1.default.authenticate("google"), this.googleCallback);
        this.router.get("/logout", this.googleLogout);
        this.router.get(`/user`, this.getUser);
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
    createToken(user) {
        const expiresIn = 60 * 60; // an hour
        const { JWT_SECRET } = process.env;
        const dataStoredInToken = {
            _id: user === null || user === void 0 ? void 0 : user._id,
        };
        return {
            expiresIn,
            token: jwt.sign(dataStoredInToken, `${JWT_SECRET}`, { expiresIn }),
        };
    }
}
exports.default = GoogleAuthController;
// private googleCallbackWithCookieAndToken = async (
//   request: Request,
//   response: Response
// ) => {
//   console.log("redirected", request.user);
//   // const profile = { ...request.user };
//   const newUser = {
//     googleId: request.user?.id,
//     email: request.user?.emails[0].value,
//     firstName: request.user?.name.givenName,
//     lastName: request.user?.name.familyName,
//     profilePhoto: request.user?.photos[0].value,
//     source: "google",
//   };
//   // const googleAuthService = new GoogleAuthService();
//   try {
//     const currentUser = await UserModel.findOne({
//       googleId: request.user?.id,
//     });
//     if (currentUser) {
//       const tokenData = this.createToken(currentUser);
//       response.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
//       response.send({ tokenData, currentUser });
//     } else {
//       const user: IUser = await UserModel.create(newUser);
//       const tokenData = this.createToken(user);
//       response.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
//       response.send({ tokenData, user });
//     }
//   } catch (error) {
//     return error;
//   }
// };
