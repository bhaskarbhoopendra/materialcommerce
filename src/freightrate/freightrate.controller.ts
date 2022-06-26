import { Router, Response, Request } from "express";
import PincodeTypeNotFoundException from "../exceptions/PincodeTypeNotFoundException";
import ZoneNotFoundException from "../exceptions/ZoneNotFoundException";
import Controller from "../interfaces/controller.interface";
import adminMiddleware from "../middleware/admin.middleware";
import FreightRateDbManager from "./freightrate.dbmanager";
import FreightRateDto from "./freightrate.dto";
import FreigthRateService from "./freightrate.service";

class FreightRateController implements Controller {
  path = "/freightrate";
  router = Router();
  freightRateService = new FreigthRateService();
  freightrateDbManager = new FreightRateDbManager();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/create/:zoneId/:pincodetypeId`,
      adminMiddleware,
      this.createFreightRate
    );
  }

  private createFreightRate = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    const zoneId: string = request.params.zoneId;
    if (zoneId == undefined) throw new ZoneNotFoundException(zoneId);
    const pincodeTypeId: string = request.params.pincodetypeId;
    if (pincodeTypeId == undefined)
      throw new PincodeTypeNotFoundException(pincodeTypeId);
    const freightRateData: FreightRateDto = request.body;
    try {
      const newfreightRate: FreightRateDto =
        await this.freightRateService.createFreightRateService(
          zoneId,
          pincodeTypeId,
          freightRateData
        );
      response.send(newfreightRate);
    } catch (error) {
      console.log(error);
    }
  };
}

export default FreightRateController;
