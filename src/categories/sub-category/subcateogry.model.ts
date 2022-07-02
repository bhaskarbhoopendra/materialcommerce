import mongoose from "mongoose";
import ISubcategory from "./subcateogry.interface";

const subcategorySchema = new mongoose.Schema({
  subcategoryName: { type: String, required: true },
  subcategoryImage: { type: String, required: true },
});

const SubCategoryModel = mongoose.model<ISubcategory & mongoose.Document>(
  "subcategory",
  subcategorySchema
);

export default SubCategoryModel;
