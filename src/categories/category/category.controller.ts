import { Request, Response, Router } from "express";
import multer from "multer";
import Controller from "../../interfaces/controller.interface";
import adminMiddleware from "../../middleware/admin.middleware";
import { fileFilter, fileStorage } from "../../util/multer";
import CategoryDto from "./category.dto";
import CategoryModel from "./category.model";

class CategoryController implements Controller {
  path = "/category";
  router = Router();
  upload = multer({ storage: fileStorage, fileFilter: fileFilter });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      adminMiddleware,
      this.upload.single("categoryImage"),
      this.createCategory
    );
    this.router.put(
      `${this.path}/update/:categoryId`,
      adminMiddleware,
      this.upload.single("categoryImage"),
      this.updateCategory
    );

    this.router.delete(
      `${this.path}/delete/:categoryId`,
      adminMiddleware,
      this.deleteCategory
    );

    this.router.get(`${this.path}`, adminMiddleware, this.getAllCategory);

    this.router.post(
      `${this.path}/addsubcategory/:subcategoryId`,
      adminMiddleware,
      this.nestSubcategory
    );
  }

  private async createCategory(
    request: Request,
    response: Response
  ): Promise<void> {
    const { categoryName }: CategoryDto = request.body;
    const categoryimagepath = request.file?.path;
    console.log({ categoryName, categoryimagepath });
    try {
      const newCategory = {
        categoryName: categoryName,
        categoryImage: categoryimagepath,
      };
      const category = await CategoryModel.create({ ...newCategory });
      response.send(category);
    } catch (error) {
      response.send(error);
    }
  }

  private async updateCategory(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const categoryId: string = request.params.categoryId;
      const { categoryName }: CategoryDto = request.body;
      const categoryimagepath: string | undefined = request.file?.path;

      const newUpatedCategory: CategoryDto = {
        categoryName: categoryName,
        categoryImage: categoryimagepath,
      };

      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        categoryId,
        { ...newUpatedCategory },
        { new: true }
      );
      response.send(updatedCategory);
    } catch (error) {
      response.send(error);
    }
  }

  private async deleteCategory(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const categoryId: string = request.params.categoryId;
      const category = await CategoryModel.findByIdAndDelete(categoryId);
      response.send("deleted");
    } catch (error) {
      response.send(error);
    }
  }

  private async getAllCategory(request: Request, response: Response) {
    try {
      const categories: CategoryDto[] = await CategoryModel.find({});
      response.send(categories);
    } catch (error) {
      response.send(error);
    }
  }

  private nestSubcategory = (request: Request, response: Response) => {
    try {
      const subcategoryID: string = request.params.subcategoryId;
      const nestCategorywithSubCateogry = {
        subcategory: subcategoryID,
      };
    } catch (error) {}
  };
}

export default CategoryController;
