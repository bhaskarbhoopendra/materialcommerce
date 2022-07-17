import { Request, Response, Router } from "express";
import multer from "multer";
import Controller from "../../interfaces/controller.interface";
import adminMiddleware from "../../middleware/admin.middleware";
import ProductDTO from "../../product/product.dto";
import IProduct from "../../product/product.interface";
import { fileFilter, fileStorage } from "../../util/multer";
import AdminProductService from "./admin.product.service";

class AdminProductController implements Controller {
  path = "/admin/product";
  router = Router();
  private adminProductService = new AdminProductService();
  upload = multer({ storage: fileStorage, fileFilter: fileFilter });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      adminMiddleware,
      this.upload.array("productImage", 10),
      this.createProduct
    );
  }

  private createProduct = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      const productData: ProductDTO = request.body;
      const files: any = request.files;
      if (!productData)
        response.sendStatus(400).json({ message: "No data in body" });
      if (!files) response.sendStatus(400).json({ message: "No File in body" });
      const product: IProduct = await this.adminProductService.createProduct(
        productData,
        files
      );
      response.send(product);
    } catch (error) {
      response.send(error);
    }
  };
}

export default AdminProductController;
