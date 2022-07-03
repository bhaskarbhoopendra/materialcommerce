import { Router, Request, Response } from "express";
import Controller from "../../interfaces/controller.interface";
import WarehouseDTo from "../../warehouse/warehouse.dto";
import VendorDbManager from "../vendor.dbmanager";
import VendorWarehouseService from "./vendor.warehouse.service";

class VendorWarehouseController implements Controller {
  path = "/vendor/warehouse";
  router = Router();
  vendorWarehouseService = new VendorWarehouseService();
  vendorDbManager = new VendorDbManager();

  constructor() {
    this.initalizeRoutes();
  }

  private initalizeRoutes() {
    this.router.post(`${this.path}/create/:vendorId`, this.vendorAddWarehouse);
  }

  private vendorAddWarehouse = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      const vendorId: string = request.params.vendorId;
      const warehouseData: WarehouseDTo = request.body;
      const vendorCreatedWarehouse =
        await this.vendorWarehouseService.vendorCreateWarehouseService(
          vendorId,
          warehouseData
        );
      const vendor = await this.vendorDbManager.findVendorById(vendorId);
      vendor?.warehouse?.push(vendorCreatedWarehouse);
      response.send(vendorCreatedWarehouse);
    } catch (error) {
      response.send(error);
    }
  };
}

export default VendorWarehouseController;
