"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
class GoogleAuthController {
    constructor() {
        this.path = "/auth/google";
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, passport_1.default.authenticate("google", {
            scope: ["email", "profile"],
        }));
        this.router.get("/auth/google/callback", passport_1.default.authenticate("google", {
            failureRedirect: "/index.html",
            successRedirect: "/hello.html",
            failureFlash: true,
            successFlash: "Successfully logged in!",
        }));
    }
}
exports.default = GoogleAuthController;
