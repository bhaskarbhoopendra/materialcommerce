import ProductDTO from "./product.dto";
import IProduct from "./product.interface";
import ProductModel from "./product.model";

export default class ProductDbManager {
  product = ProductModel;
  constructor() {}

  async CreateProduct(data: ProductDTO): Promise<IProduct> {
    return await this.product.create({ ...data });
  }

  async UpdateProduct(productId: string, data: ProductDTO) {
    return await this.product.findByIdAndUpdate(
      productId,
      { ...data },
      { new: true }
    );
  }
}
