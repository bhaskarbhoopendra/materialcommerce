import { Request, Response, Router } from "express";
import Controller from "../../interfaces/controller.interface";
import WarehouseDTo from "../../warehouse/warehouse.dto";
import VendorWarehouseService from "./vendor.warehouse.service";

class VendorWarehouseController implements Controller {
  path = "/vendor/warehouse";
  router = Router();
  vendorWarehouseService = new VendorWarehouseService();

  constructor() {
    this.initalizeRoutes();
  }

  private initalizeRoutes() {
    this.router.post(
      `${this.path}/create/:vendorId`,
      this.vendorCreateWarehouse
    );
    this.router.get(`${this.path}`, this.getWarehouse);
  }

  private vendorCreateWarehouse = async (
    request: Request,
    response: Response
  ) => {
    try {
      const vendorId: string = request.params.vendorId;
      const warehouseData: WarehouseDTo = request.body;
      const vendorCreatedWarehouse =
        await this.vendorWarehouseService.vendorCreateWarehouseService(
          vendorId,
          warehouseData
        );
      response.send(vendorCreatedWarehouse);
    } catch (error) {
      response.send(error);
    }
  };

  private getWarehouse = async (request: Request, response: Response) => {
    try {
      const warehouse = await this.vendorWarehouseService.getWarehouse();
      response.send(warehouse);
    } catch (error) {
      response.send(error);
    }
  };
}

export default VendorWarehouseController;
