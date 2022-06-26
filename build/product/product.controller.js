"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class ProductController {
    constructor() {
        this.path = "/product";
        this.router = (0, express_1.Router)();
        this.product = async (request, response) => {
            response.send("Hello From product");
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.product);
    }
}
exports.default = ProductController;
