import { Request, Response, Router } from "express";
import Controller from "../../interfaces/controller.interface";
import adminMiddleware from "../../middleware/admin.middleware";
import CategoryDto from "./category.dto";
import CategoryModel from "./category.model";

class CategoryController implements Controller {
  path = "/category";
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      adminMiddleware,
      this.createCategory
    );
    this.router.put(
      `${this.path}/update/:categoryId`,
      adminMiddleware,
      this.updateCategory
    );

    this.router.delete(
      `${this.path}/delete/:categoryId`,
      adminMiddleware,
      this.deleteCategory
    );

    this.router.get(`${this.path}`, adminMiddleware, this.getAllCategory);
  }

  private async createCategory(
    request: Request,
    response: Response
  ): Promise<void> {
    const { categoryName }: CategoryDto = request.body;
    console.log(categoryName);
    try {
      const category = await CategoryModel.create({ categoryName });
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
      const updatedCategory = await CategoryModel.findByIdAndUpdate(
        categoryId,
        { categoryName },
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
}

export default CategoryController;
