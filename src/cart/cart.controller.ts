import { Request, Response, Router } from 'express';
import Controller from '../interfaces/controller.interface';
import CartModel from './cart.model';
import CartService from './cart.service';
import ICart from './cart.interface';
import UserModel from '../user/user.model';
class CartController implements Controller {
  path = '/cart';
  router = Router();
  public cartService = new CartService();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(`${this.path}/create/:productId/:userId`, this.createCart);

    this.router.get(`${this.path}/:userId`, this.getCart);
  }

  private async createCart(request: Request, response: Response) {
    const productId: string = request.params.productId;
    const userId: string = request.params.userId;
    const quantity: number = request.body.quantity;
    console.log({ productId, userId, quantity });
    try {
      const newCart = {
        user: userId,
      };
      const cart = await CartModel.create({ ...newCart });
      await cart.products.push({ productId: productId, quantity: quantity });
      await cart.save();
      response.send(cart);
    } catch (error) {
      response.send(error);
    }
  }

  private async getCart(request: Request, response: Response) {
    try {
      const userId = request.params.userId;
      const cart = await CartModel.findById(userId);
      response.send(cart);
    } catch (error) {
      response.send(error);
    }
  }
}

export default CartController;
