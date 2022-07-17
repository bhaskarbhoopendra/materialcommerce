import mongoose from "mongoose";
import IProduct from "./product.interface";

const productSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  taxType: String,
  tax: Number,
  discountedPrice: Number,
  saleIn: String,
  weight: Number,
  wightUnit: String,
  height: Number,
  heightUnit: String,
  length: Number,
  lengthUnit: String,
  width: Number,
  widthUnit: String,
  sku: Number,
  stock: Number,
  unitPerBox: Number,
  minimumQuantity: Number,
  maximumQuantity: Number,
  manufacturer: String,
  madeIn: String,
  image: [String],
  description: String,
  isAreaCalculate: Boolean,
  isCancelable: Boolean,
  isRefundable: Boolean,
  isReturnable: Boolean,
  cashOnDeliverry: Boolean,
  isOfferAvailable: Boolean,
  isDeliveryChargeApplicable: Boolean,
});

const ProductModel = mongoose.model<IProduct & mongoose.Document>(
  "product",
  productSchema
);

export default ProductModel;
