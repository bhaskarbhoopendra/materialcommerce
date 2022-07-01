import { Router, Request, Response } from "express";
import Controller from "../interfaces/controller.interface";

class ProductController implements Controller {
  path = "/product";
  router = Router();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, this.product);
  }

  private product = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    response.send("Hello From product");
  };
}

export default ProductController;
