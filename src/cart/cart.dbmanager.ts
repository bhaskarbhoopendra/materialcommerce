import CartModel from './cart.model';
class CartDbManager {
  public cartModel = CartModel;
  constructor() {}

  createCart = async (data: any) => {
    return await this.cartModel.create({ ...data });
  };

  public getCart = async (id: string) => {
    return await this.cartModel.findById(id);
  };
}

export default CartDbManager;
