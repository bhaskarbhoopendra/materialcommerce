import { Request, Response, Router } from "express";
import multer from "multer";
import Controller from "../../interfaces/controller.interface";
import adminMiddleware from "../../middleware/admin.middleware";
import authMiddleware from "../../middleware/auth.middleware";
import { fileFilter, fileStorage } from "../../util/multer";
import SubCategoryDto from "./subcateogry.dto";
import SubCategoryModel from "./subcateogry.model";

class SubCategoryController implements Controller {
  path = "/subcategory";
  router = Router();
  upload = multer({ storage: fileStorage, fileFilter: fileFilter });

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create`,
      adminMiddleware,
      this.upload.single("subcategoryImage"),
      this.createSubCategory
    );
    this.router.put(
      `${this.path}/update/:subcategoryId`,
      adminMiddleware,
      this.upload.single("subcategoryImage"),
      this.updateSubCategory
    );
    this.router.delete(
      `{this.path}/delete/:subcategoryId`,
      authMiddleware,
      this.deleteSubCategory
    );
    this.router.get(`${this.path}`, authMiddleware, this.getAllSubCategory);
  }

  private async createSubCategory(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const { subcategoryName }: SubCategoryDto = request.body;
      const subcategoryImagePath: string | undefined = request.file?.path;
      if (subcategoryImagePath == undefined)
        response.send("Image path not defined");
      const newSubcategory = {
        subcategoryName: subcategoryName,
        subcategoryImage: subcategoryImagePath,
      };
      const subcategory: SubCategoryDto = await SubCategoryModel.create({
        ...newSubcategory,
      });
      response.send(subcategory);
    } catch (error) {
      response.send(error);
    }
  }

  private async updateSubCategory(request: Request, response: Response) {
    try {
      const subCategoryId: string = request.params.subcategoryId;
      const { subcategoryName }: SubCategoryDto = request.body;
      const subcategoryImagePath: string | undefined = request.file?.path;
      const updatedSubCategory = {
        subcategoryName: subcategoryName,
        subcategoryImage: subcategoryImagePath,
      };

      const subCategory = await SubCategoryModel.findByIdAndUpdate(
        subCategoryId,
        { ...updatedSubCategory },
        { new: true }
      );
      response.send(subCategory);
    } catch (error) {
      response.send(error);
    }
  }

  private async deleteSubCategory(request: Request, response: Response) {
    try {
      const subCategoryId: string = request.params.subcategoryId;
      await SubCategoryModel.findByIdAndDelete(subCategoryId);
      response.send("Sub Category Deleted");
    } catch (error) {
      response.send(error);
    }
  }

  private async getAllSubCategory(request: Request, response: Response) {
    try {
      const subCategory: SubCategoryDto[] = await SubCategoryModel.find(
        {}
      ).lean();
      response.send(subCategory);
    } catch (error) {
      response.send(error);
    }
  }
}

export default SubCategoryController;
