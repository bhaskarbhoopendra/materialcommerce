import { Request, Response, Router } from "express";
import Controller from "../interfaces/controller.interface";
import BlogDTo from "./blog.dto";
import blogModel from "./blog.model";

class BlogController implements Controller {
  public path = "/blogs";
  public router = Router();
  public blogModel = blogModel
  constructor() {
    this.initizeRoutes();
  }

  private initizeRoutes() {
    this.router.get(`${this.path}`, this.getAllBlogs);
    this.router.get(`${this.path}/get`, this.getOneBlog);
    this.router.post(`${this.path}/create`, this.createBlog);
  }

  private getAllBlogs = (request: Request, response: Response) => {
    response.send("Hello From GetALl Blogs");
  };

  private getOneBlog = (request: Request, response: Response) => {
    response.send("I am the one get blog route");
  };

  private createBlog = async (request: Request, response: Response) => {
    try {
      const blogData: BlogDTo = request.body
      const createBlog = await this.blogModel.create({...blogData})
      response.send({createBlog})
        } catch (error) {
        response.send(error);
      } 
  }
}

export default BlogController;
