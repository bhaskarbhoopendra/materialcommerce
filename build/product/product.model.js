"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
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
const ProductModel = mongoose_1.default.model("product", productSchema);
exports.default = ProductModel;
