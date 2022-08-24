import { CartDbManager } from "./cart.dbmanager";
import { CartDto } from "./cart.dto";
import CartModel from "./cart.model";

export default class CartService {
  cartDbManager = new CartDbManager();
  constructor() {}

  async addToCart(quantity: number, productId: CartDto) {
    const newCart = {
      quantity: quantity,
      product: productId,
    };
    const newCartItem = await this.cartDbManager.addToCart(newCart);
    return newCartItem;
  }

  async getCart() {
    const cart = await this.cartDbManager.getCart();
    return cart;
  }
}
