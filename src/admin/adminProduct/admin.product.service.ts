import ProductDbManager from "../../product/product.dbmanager";
import ProductDTO from "../../product/product.dto";
import IProduct from "../../product/product.interface";

export default class AdminProductService {
  productDbManager = new ProductDbManager();
  constructor() {}

  createProduct = async (
    productData: ProductDTO,
    files: any
  ): Promise<IProduct> => {
    const file = files.map((file: any) => {
      return file.path;
    });
    const newProduct = {
      ...productData,
      image: file,
    };

    const product = await this.productDbManager.CreateProduct(newProduct);
    console.log(product);
    return product;
  };
}
