import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import CartDto from './cart.dto';
import CartModel from './cart.model';

class CartController implements Controller {
  path = '/cart';
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create/:quantity/:productId/:userId`,
      this.createCart
    );

    this.router.get(`${this.path}/:userId`, this.getCart);
  }

  private async createCart(request: Request, response: Response) {
    const productId: string = request.params.productId;
    const userId: string = request.params.userId;
    const quantity: string = request.params.quantity;
    console.log({ productId, userId, quantity });
    try {
      const newCart = {
        product: productId,
        user: userId,
        quantity: quantity,
      };
      const cart = await CartModel.create({ ...newCart });
      response.send(cart);
    } catch (error) {
      response.send(error);
    }
  }

  private async getCart(request: Request, response: Response) {
    try {
      const userId: string = request.params.userId;
      console.log(userId);
      const cart = await CartModel.find({});
      console.log(cart);
      response.send(cart);
    } catch (error) {
      response.send(error);
    }
  }
}

export default CartController;
