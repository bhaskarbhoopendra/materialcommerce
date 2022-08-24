import { Router, Request, Response } from "express";
import Controller from "../interfaces/controller.interface";
import { CartDto } from "./cart.dto";
import CartModel from "./cart.model";
import CartService from "./cart.service";

class CartController implements Controller {
  path = "/cart";
  router = Router();
  cartService = new CartService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create/:productId`, this.addToCart);
    this.router.get(`${this.path}/get`, this.getCart);
  }

  private addToCart = async (request: Request, response: Response) => {
    try {
      const { quantity } = request.body;
      const productId: any = request.params.productId;
      const cartItem = await this.cartService.addToCart(quantity, productId);
      response.send(cartItem);
    } catch (error) {
      console.log(error);
    }
  };

  private getCart = async (request: Request, response: Response) => {
    try {
      const cart = await this.cartService.getCart();
      response.send(cart);
    } catch (error) {
      console.log(error);
    }
  };
}

export default CartController;
