import { Router, Request, Response } from "express";
import Controller from "../../interfaces/controller.interface";
import AdminVendorWarehouseService from "./admin.vendor.warehouse.service";

class AdminVendorWarehouseController implements Controller {
  path = "/admin/vendor/warehouse";
  router = Router();
  adminVendorWarehouseService = new AdminVendorWarehouseService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/verify/:vendorId/:warehouseId`,
      this.adminVerifyVendorsWarehouse
    );
  }

  private adminVerifyVendorsWarehouse = async (
    request: Request,
    response: Response
  ) => {
    const vendorId: string = request.params.vendorId;
    const warehouseId: string = request.params.warehouseId;
    try {
      const verifiedWarehouse =
        await this.adminVendorWarehouseService.verifyVendorsWarehouse(
          vendorId,
          warehouseId
        );
      response.send(verifiedWarehouse);
    } catch (error) {
      response.send(error);
    }
  };
}

export default AdminVendorWarehouseController;
