import { Request, Response, Router } from 'express';
import CartModel from '../cart/cart.model';
import Controller from '../interfaces/controller.interface';
import WishlistModel from './wishlist.model';

class WishlistController implements Controller {
  path = '/wishlist';
  router = Router();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      `${this.path}/create/:productId/:userId`,
      this.createWishlist
    );

    this.router.get(`${this.path}/:userId`, this.getWishlist);
  }

  private async createWishlist(request: Request, response: Response) {
    const productId: string = request.params.productId;
    const userId: string = request.params.userId;

    console.log({ productId, userId });
    try {
      const newWishlist = {
        product: productId,
        user: userId,
      };
      const cart = await WishlistModel.create({ ...newWishlist });
      response.send(cart);
    } catch (error) {
      response.send(error);
    }
  }

  private async getWishlist(request: Request, response: Response) {
    try {
      const userId = request.params.userId;
      const wishlist = await CartModel.findById(userId);
      response.send(wishlist);
    } catch (error) {
      response.send(error);
    }
  }
}

export default WishlistController;
