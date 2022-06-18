"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_service_1 = __importDefault(require("./authentication.service"));
class AuthenticationController {
    constructor() {
        this.path = "/auth";
        this.router = (0, express_1.Router)();
        this.authenticationService = new authentication_service_1.default();
        this.initializeRoutes = () => {
            this.router.post(`${this.path}/register`, this.registerUser);
            this.router.post(`${this.path}/login`, this.userLogin);
            this.router.post(`${this.path}/logout`, this.userLogout);
        };
        this.registerUser = async (request, response) => {
            const userData = request.body;
            try {
                const { user, cookie } = await this.authenticationService.register(userData);
                response.setHeader('Set-Cookie', [cookie]);
                response.send({ user });
            }
            catch (error) {
                return error;
            }
        };
        this.userLogin = async (request, response) => {
            const loginCred = request.body;
            try {
                const email = loginCred.email;
                const password = loginCred.password;
                if (email === null || email === undefined || password === null || password === undefined)
                    response.send("invalid input");
                const { user, cookie, tokenData } = await this.authenticationService.login(loginCred);
                response.setHeader('Set-Cookie', [cookie]);
                response.send({ user, tokenData });
            }
            catch (error) {
                return error;
            }
        };
        this.userLogout = (request, response) => {
            try {
                response.setHeader('Set-Cookie', ['Authorization=,Max-Age=0']);
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
