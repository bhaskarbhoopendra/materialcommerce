import mongoose from "mongoose";
import ICategory from "./category.interface";

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  categoryImage: String,
});

const CategoryModel = mongoose.model<ICategory & mongoose.Document>(
  "category",
  categorySchema
);

export default CategoryModel;
