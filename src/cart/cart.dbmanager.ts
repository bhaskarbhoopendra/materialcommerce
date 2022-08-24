import CartModel from "./cart.model";

export class CartDbManager {
  cartModel = CartModel;
  constructor() {}

  async addToCart(data: any) {
    return await this.cartModel.create({ ...data });
  }

  async getCart() {
    return await this.cartModel.find({});
  }
}
