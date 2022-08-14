import { Router, Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import UserModel from './user.model';
class UserController implements Controller {
  public path = '/user';
  public router: Router = Router();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      `${this.path}/:userId/cart/:productId/create`,
      this.createCart
    );

    this.router.get(`${this.path}/:userId`, this.getUser);
  }

  private async createCart(request: Request, response: Response) {
    const userId: string = request.params.userId;
    const productId: string = request.params.productId;
    const quantity: number = request.body.quantity;
    const user = await UserModel.findById(userId);
    const cart = await user?.cart;
    const cartItems = {
      productId: productId,
      quantity: quantity,
    };

    try {
      if (cart) {
        if (cart.length > 0) {
          for (let index = 0; index < cart.length; index++) {
            const element = cart[index];
            if (element.productId == productId) {
              return response.send('productExists');
            } else {
              user?.cart.push(cartItems);
              user?.save();
              return response.send(user);
            }
          }
        } else {
          user?.cart.push(cartItems);
          user?.save();
          return response.send(user);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async getUser(request: Request, response: Response) {
    const userId = request.params.userId;
    try {
      const user = await UserModel.findById(userId);
      response.status(201).send(user);
    } catch (error) {
      response.send(error);
    }
  }
}

export default UserController;
