"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class AdminController {
    constructor() {
        this.path = "/admin";
        this.router = (0, express_1.Router)();
        this.adminRegister = () => { };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, this.adminRegister);
    }
}
exports.default = AdminController;
