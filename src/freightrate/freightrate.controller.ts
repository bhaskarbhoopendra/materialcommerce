import { Router, Response, Request } from "express";
import PincodeTypeNotFoundException from "../exceptions/PincodeTypeNotFoundException";
import ZoneNotFoundException from "../exceptions/ZoneNotFoundException";
import Controller from "../interfaces/controller.interface";
import adminMiddleware from "../middleware/admin.middleware";
import FreightRateDbManager from "./freightrate.dbmanager";
import FreightRateDto from "./freightrate.dto";
import FreightRateModel from "./freightrate.model";
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
    this.router.put(
      `${this.path}/update/:freightrateId`,
      adminMiddleware,
      this.updateFreightRate
    );
    this.router.delete(
      `${this.path}/delete/:freightrateId`,
      adminMiddleware,
      this.deleteFreightRate
    );
    this.router.get(`${this.path}`, adminMiddleware, this.getAllFreightRate);
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
    const freightRateData = request.body;
    const { weightType, upperbound, lowerbound, rate } = freightRateData;
    try {
      const newFreightRateData = {
        zone: zoneId,
        pincodetype: pincodeTypeId,
        weightType,
        upperbound,
        lowerbound,
        rate,
      };
      const freightrate = await FreightRateModel.create({
        ...newFreightRateData,
      });
      response.send(freightrate);
    } catch (error) {
      console.log(error);
    }
  };

  private updateFreightRate = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    const freightRateId: string = request.params.freightrateId;
    const freightRateData: FreightRateDto = request.body;
    try {
      const updateFreightRate =
        await this.freightRateService.updateFreightRateService(
          freightRateId,
          freightRateData
        );
      response.send(updateFreightRate);
    } catch (error) {
      console.log(error);
    }
  };

  private deleteFreightRate = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    const freightRateId: string = request.params.freightrateId;
    await this.freightRateService.deleteFreightRateService(freightRateId);
    response.send("Freight Rate Deleted");
  };

  private getAllFreightRate = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      const freightRate = await FreightRateModel.find({})
        .populate("pincodetype")
        .populate("zone");
      response.send(freightRate);
    } catch (error) {
      console.log(error);
    }
  };
}

export default FreightRateController;
