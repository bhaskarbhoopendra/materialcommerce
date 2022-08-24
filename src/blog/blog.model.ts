import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const blogModel = mongoose.model("blog", blogSchema);

export default blogModel;
