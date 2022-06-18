import { Router, Request, Response } from "express";
import Controller from "../../interfaces/controller.interface";
import PincodeTypeDbManager from "./pincodetype.dbmanager";
import PincodeTypeDto from "./pincodetype.dto";
import PincodeTypeModel from "./pincodetype.model";
import IPincodeType from "./pinocodetype.interface";

class PincodeTypeController implements Controller {
  path = "/pincodetype";
  router = Router();
  pincodeTypeModel = PincodeTypeModel;
  pincodeTypeDbManager = new PincodeTypeDbManager();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, this.createPincodeType);
    this.router.get(`${this.path}/`, this.getAllPincodeType);
  }

  private createPincodeType = async (request: Request, response: Response) => {
    const pincodeTypeData: PincodeTypeDto = request.body;
    try {
      const pincodeType: IPincodeType = await this.pincodeTypeModel.create({
        ...pincodeTypeData,
      });
      response.send(pincodeType);
    } catch (error) {
      console.log(error);
    }
  };

  private getAllPincodeType = async (request: Request, response: Response) => {
    try {
      const pincodetypes = await this.pincodeTypeDbManager.getAllPinocdeType();
      response.send(pincodetypes);
    } catch (error) {
      console.log(error);
    }
  };
}

export default PincodeTypeController;
