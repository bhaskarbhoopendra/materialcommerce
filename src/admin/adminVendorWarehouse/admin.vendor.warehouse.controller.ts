import { Router, Request, Response } from "express";
import Controller from "../../interfaces/controller.interface";
import adminMiddleware from "../../middleware/admin.middleware";
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
      adminMiddleware,
      this.adminVerifyVendorsWarehouse
    );
    this.router.get(
      `${this.path}/confrimed/unconfrimedvendor`,
      adminMiddleware,
      this.allVendors
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

  private allVendors = async (request: Request, response: Response) => {
    try {
      const { unconfrimedVendors, confrimedVendors } =
        await this.adminVendorWarehouseService.getAllVendorsService();

      response.send({ unconfrimedVendors, confrimedVendors });
    } catch (error) {
      response.send(error);
    }
  };
}

export default AdminVendorWarehouseController;
