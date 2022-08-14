import CartDbManager from './cart.dbmanager';
import ICart from './cart.interface';

export default class CartService {
  cartDbManager = new CartDbManager();
  constructor() {}

  createCart = async (productId: string, userId: string, quantity: number) => {
    const newCart = {
      product: productId,
      user: userId,
      quantity: quantity,
    };
    const cartByUser = await this.cartDbManager.getCart(userId);
    const cart = await this.cartDbManager.createCart(newCart);
    console.log(cartByUser);
    return cartByUser;
  };
  getCart = async (userId: string) => {
    const cart = await this.cartDbManager.getCart(userId);
    return cart;
  };
}
