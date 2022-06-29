import { Router, Request, Response } from "express";
import Controller from "../../interfaces/controller.interface";
import PincodeTypeModel from "./pincodetype.model";

class PincodeTypeController implements Controller {
  path = "/pincodetype";
  router = Router();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes() {
    this.router.post(`${this.path}/create`, this.createPincode);
  }

  private async createPincode(
    request: Request,
    response: Response
  ): Promise<void> {
    const pincodeTypeData = request.body;
    try {
      const pincodeType = await PincodeTypeModel.create({ ...pincodeTypeData });
      response.send(pincodeType);
    } catch (error) {}
  }
}

export default PincodeTypeController;
