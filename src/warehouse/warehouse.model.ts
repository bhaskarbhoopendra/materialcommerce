import mongoose from "mongoose";
import { addressSchema } from "../user/user.model";
import Iwarehouse from "./warehouse.interface";

const warehouseSchema = new mongoose.Schema({
  address: addressSchema,
  warehouseName: String,
  isVerifiedWarehouse: { enum: ["confirmed", "pending"] },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vendor",
  },
});

const Warehouse = mongoose.model<Iwarehouse>("warehouse", warehouseSchema);

export default Warehouse;
