import controller from "../interfaces/controller.interface";
import { Router, Request, Response, NextFunction } from "express";
import UserWithThatEmailAlreadyExistsException from "../exceptions/userWithThatEmailAlreadyExistsException";
import vendorDto from "./vendor.dto";
import VendorDbManager from "./vendor.dbmanager";
import VendorAuthenticatonService from "./vendor.authentication.service";
import LoginDto from "../authentication/login.dto";

class VendorAuthenticationController implements controller {

  public path = '/vendor';
  public router = Router();
  vendorDbManager = new VendorDbManager();
  vendorAuthenticationService = new VendorAuthenticatonService();

  constructor() { this.initializeRoutes(); }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, this.registerVendor);
    this.router.post(`${this.path}/login`, this.loginVendor)
  }

  private registerVendor = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data: vendorDto = request.body;
      const { cookie, createdVendor } = await this.vendorAuthenticationService.register(data);
      response.setHeader("Set-Cookie", [cookie]);
      response.send({ createdVendor });
    }
    catch (error) {
      next(error);
    }
  }

  private loginVendor = async (request: Request, response: Response, next: NextFunction) => {
    try {

      const vendorCred: LoginDto = request.body;
      const { tokenData, cookie, vendor } =
        await this.vendorAuthenticationService.login(vendorCred);

      response.setHeader("Set-Cookie", [cookie]);
      response.send({
        tokenData,
        vendor
      })
    } catch (error) {
      next(error);
    }
  }

}

export default VendorAuthenticationController;