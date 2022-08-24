"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class BlogController {
    constructor() {
        this.path = "/blogs";
        this.router = (0, express_1.Router)();
        this.getAllBlogs = (request, response) => {
            response.send("Hello From GetALl Blogs");
        };
        this.getOneBlog = (request, response) => {
            response.send("I am the one get blog route");
        };
        this.initizeRoutes();
    }
    initizeRoutes() {
        this.router.get(`${this.path}`, this.getAllBlogs);
        this.router.get(`${this.path}/get`, this.getOneBlog);
    }
}
exports.default = BlogController;
