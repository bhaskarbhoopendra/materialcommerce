import mongoose from "mongoose";
import ICategory from "./category.interface";

const categorySchema = new mongoose.Schema({
  categoryName: String,
  categoryImage: String,
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategory",
  },
});

const CategoryModel = mongoose.model<ICategory & mongoose.Document>(
  "category",
  categorySchema
);

export default CategoryModel;
