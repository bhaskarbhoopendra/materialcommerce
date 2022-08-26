"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_model_1 = __importDefault(require("./blog.model"));
class BlogController {
    constructor() {
        this.path = "/blogs";
        this.router = (0, express_1.Router)();
        this.blogModel = blog_model_1.default;
        this.getAllBlogs = (request, response) => {
            response.send("Hello From GetALl Blogs");
        };
        this.getOneBlog = (request, response) => {
            response.send("I am the one get blog route");
        };
        this.createBlog = async (request, response) => {
            try {
                const blogData = request.body;
                const createBlog = await this.blogModel.create(Object.assign({}, blogData));
                response.send({ createBlog });
            }
            catch (error) {
                response.send(error);
            }
        };
        this.initizeRoutes();
    }
    initizeRoutes() {
        this.router.get(`${this.path}`, this.getAllBlogs);
        this.router.get(`${this.path}/get`, this.getOneBlog);
        this.router.post(`${this.path}/create`, this.createBlog);
    }
}
exports.default = BlogController;
