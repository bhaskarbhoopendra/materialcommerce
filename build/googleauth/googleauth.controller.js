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
            if (process.env.NODE_ENV === "production") {
                response.redirect("https://orca-app-hlc5k.ondigitalocean.app/googlesuccess");
            }
            else {
                response.redirect("http://localhost:3000");
            }
        };
        this.getUser = async (request, response) => {
            console.log(request.user);
            const user = request.user;
            const token = this.createToken(user);
            const cookie = this.createCookie(token);
            if (user) {
                response.setHeader("Set-Cookie", [cookie]);
                response.send({ user, token });
            }
            else {
                response.send("No user");
            }
        };
        this.googleLogout = async (request, response, next) => {
            if (request.user) {
                response.setHeader("Set-Cookie", ["Authorization=;Max-Age=0"]);
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
        this.router.get(`${this.path}/callback`, passport_1.default.authenticate("google", { session: true }), this.googleCallback);
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
