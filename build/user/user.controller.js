"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class UserController {
    constructor() {
        this.path = "/user";
        this.router = (0, express_1.Router)();
    }
}
exports.default = UserController;
