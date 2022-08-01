import mongoose from 'mongoose';
import ICart from './cart.interface';

const cartSchema = new mongoose.Schema({
  quantity: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
  },
});

const CartModel = mongoose.model<ICart>('cart', cartSchema);

export default CartModel;
