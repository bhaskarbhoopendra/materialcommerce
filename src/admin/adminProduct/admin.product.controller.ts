import { Request, Response, Router } from "express";
import multer from "multer";
import Controller from "../../interfaces/controller.interface";
import adminMiddleware from "../../middleware/admin.middleware";
import ProductDTO from "../../product/product.dto";
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
      const imagePath: any = request.files;
      if (!productData)
        response.sendStatus(400).json({ message: "No data in body" });
      if (!imagePath)
        response.sendStatus(400).json({ message: "No File in body" });
      const product = this.adminProductService.createProduct();
      response.send(product);
    } catch (error) {
      response.send(error);
    }
  };
}

export default AdminProductController;
