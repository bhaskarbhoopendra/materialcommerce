import { Request, Response, Router } from "express";
import VerifiedStatus from "../enums/enums.vendor";
import VendorNotFoundException from "../exceptions/VendorNotFoundException";
import Controller from "../interfaces/controller.interface";
import adminMiddleware from "../middleware/admin.middleware";
import VendorDbManager from "../vendor/vendor.dbmanager";

class AdminController implements Controller {
  public path = "/admin";
  public router = Router();
  vendorDbManager = new VendorDbManager();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/verifyvendor/:vendorId`,
      adminMiddleware,
      this.adminVerifyVendor
    );

    this.router.get(
      `${this.path}/getvendor/:vendorId`,
      adminMiddleware,
      this.admingGetVendor
    );
  }

  private adminVerifyVendor = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    const vendorId: string = request.params.vendorId;
    if (vendorId == undefined) throw new VendorNotFoundException(vendorId);
    try {
      const confirmedvendor = await this.vendorDbManager.updateVendorById(
        vendorId,
        {
          isConfirmedVendor: VerifiedStatus.CONFIRMED,
        }
      );
      response.send(confirmedvendor);
    } catch (error) {
      response.send(error);
    }
  };

  private admingGetVendor = async (request: Request, response: Response) => {
    try {
      const vendorId: string = request.params.vendorId;
      if (vendorId == undefined) throw new VendorNotFoundException(vendorId);
      const vendor = await this.vendorDbManager.findVendorById(vendorId);
      response.send(vendor);
    } catch (error) {
      response.send(error);
    }
  };
}

export default AdminController;
