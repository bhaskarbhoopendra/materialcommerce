import mongoose from 'mongoose';
import ICart from './cart.interface';
let cartProducts = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  products: [cartProducts],
});

const CartModel = mongoose.model<ICart>('cart', cartSchema);

export default CartModel;
