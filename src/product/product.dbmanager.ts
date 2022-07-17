import ProductDTO from "./product.dto";
import IProduct from "./product.interface";
import ProductModel from "./product.model";

export default class ProductDbManager {
  product = ProductModel;
  async CreateProduct(data: ProductDTO): Promise<IProduct> {
    return await this.product.create({ ...data });
  }
}
