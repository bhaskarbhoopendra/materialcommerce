import { Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import blogModel from "./blog.model";

class BlogController implements Controller {
  path = "/blogs";
  router = Router();
  constructor() {
    this.initizeRoutes();
  }

  private initizeRoutes() {
    this.router.get(`${this.path}`, this.getAllBlogs);
    this.router.get(`${this.path}/get`, this.getOneBlog);
  }

  getAllBlogs = (request: Request, response: Response) => {
    response.send("Hello From GetALl Blogs");
  };

  getOneBlog = (request: Request, response: Response) => {
    response.send("I am the one get blog route");
  };
}

export default BlogController;
