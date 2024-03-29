import { ParamsDictionary } from "express-serve-static-core";
import Warehouse from "./warehouse.model";

class WarehouseDbManager {
  public warehouse = Warehouse;
  public id: string;
  public data: any;
  constructor() {}

  createWarehouse = async (data: any) => {
    return await this.warehouse.create({ ...data });
  };

  public getAllWarehouse = async () => {
    return await this.warehouse.find({}).populate("vendor");
  };

  public warehouseByID = async (id: string) => {
    return await this.warehouse.findById(id);
  };

  public warehouseByIDAndUpdate = async (id: string, data: any) => {
    return this.warehouse.findByIdAndUpdate(id, data, { new: true });
  };

  public warehouseByIDAndDelete = async (id: string | ParamsDictionary) => {
    return await this.warehouse.findByIdAndDelete(id);
  };
}

export default WarehouseDbManager;
