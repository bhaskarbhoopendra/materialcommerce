"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_service_1 = __importDefault(require("./authentication.service"));
const user_model_1 = __importDefault(require("../user/user.model"));
const user_dbmanager_1 = __importDefault(require("../user/user.dbmanager"));
class AuthenticationController {
    constructor() {
        this.path = "/auth";
        this.router = (0, express_1.Router)();
        this.user = user_model_1.default;
        this.userDbManager = new user_dbmanager_1.default();
        this.authenticationService = new authentication_service_1.default();
        this.initializeRoutes = () => {
            this.router.post(`${this.path}/register`, this.registerUser);
            this.router.post(`${this.path}/login`, this.userLogin);
            this.router.post(`${this.path}/logout`, this.userLogout);
        };
        this.registerUser = async (request, response, next) => {
            try {
                const data = request.body;
                const { user, tokenData } = await this.authenticationService.register(data);
                response.cookie("Authorization", `${tokenData.token}`, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true,
                });
                response.send(user);
            }
            catch (error) {
                next(error);
            }
        };
        this.userLogin = async (request, response) => {
            const userData = request.body;
            try {
                const { user, tokenData } = await this.authenticationService.login(userData);
                response.cookie("Authorization", `${tokenData.token}`, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true,
                });
                response.send({ user });
            }
            catch (error) {
                return error;
            }
        };
        this.userLogout = (request, response) => {
            try {
                response.setHeader("Set-Cookie", ["Authorization=,Max-Age=0"]);
                response.send("logged out");
            }
            catch (error) {
                return error;
            }
        };
        this.initializeRoutes();
    }
}
exports.default = AuthenticationController;
