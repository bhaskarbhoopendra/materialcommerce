import mongoose from "mongoose";
import Icart from "./cart.interface";

const cartSchema = new mongoose.Schema({
  quantity: Number,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
});

const CartModel = mongoose.model<mongoose.Document & Icart>("cart", cartSchema);

export default CartModel;
