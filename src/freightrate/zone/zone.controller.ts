import { Router, Request, Response } from "express";
import Controller from "../../interfaces/controller.interface";
import ZoneDbManager from "./zone.dbmanager";
import ZoneDTO from "./zone.dto";
import IZone from "./zone.interface";
import ZoneModel from "./zone.model";

class ZoneController implements Controller {
  path = "/zone";
  router = Router();
  zone = ZoneModel;
  zoneDbManager = new ZoneDbManager();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/create`, this.createZone);
    this.router.get(`${this.path}/get`, this.getAllZone);
    this.router.put(`${this.path}/update/:zoneId`, this.updateZone);
    this.router.delete(`${this.path}/delete/:zoneId`, this.deleteZone);
  }

  private createZone = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      const zoneData: ZoneDTO = request.body;
      const zone = await this.zone.create({ ...zoneData });
      response.send(zone);
    } catch (error) {
      console.log(error);
    }
  };

  private getAllZone = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      const zone = await this.zoneDbManager.getAllZone();
      response.send(zone);
    } catch (error) {
      console.log(error);
    }
  };

  private updateZone = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      const zoneId: string = request.params.zoneId;
      const zoneData: ZoneDTO = request.body;
      const updatedZone = await this.zoneDbManager.updateZoneById(
        zoneId,
        zoneData
      );
      response.send(updatedZone);
    } catch (error) {
      console.log(error);
    }
  };

  private deleteZone = async (
    request: Request,
    response: Response
  ): Promise<void> => {
    try {
      const zoneId = request.params.zoneId;
      const deletedZone = await this.zone.findByIdAndDelete(zoneId);
      response.send("zone Delted");
    } catch (error) {
      console.log(error);
    }
  };
}

export default ZoneController;
