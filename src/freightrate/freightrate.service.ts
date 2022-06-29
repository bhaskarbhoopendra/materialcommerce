import FreightRateDbManager from "./freightrate.dbmanager";
import FreightRateDto from "./freightrate.dto";
import FreightRateModel from "./freightrate.model";

export default class FreigthRateService {
  // freightRatemodel = FreightRateModel;
  freightRateDbManger = new FreightRateDbManager();
  constructor() {}

  createFreightRateService = async (
    zoneId: string,
    pincodeTypeId: string,
    freightRateData: any
  ) => {
    const { weightType, upperbound, lowerbound, rate } = freightRateData;
    const newFreightRateData = {
      zone: zoneId,
      pincodetype: pincodeTypeId,
      weightType,
      upperbound,
      lowerbound,
      rate,
    };
    const freightrate = await this.freightRateDbManger.createFreightRate(
      newFreightRateData
    );
  };

  updateFreightRateService = async (
    freightRateId: string,
    freightRateData: FreightRateDto
  ): Promise<FreightRateDto> => {
    const freightRate: FreightRateDto =
      await this.freightRateDbManger.updateFreightRate(
        freightRateId,
        freightRateData
      );
    return freightRate;
  };

  deleteFreightRateService = async (freightRateId: string) => {
    return await this.freightRateDbManger.deleteFreightRate(freightRateId);
  };

  getAllFreightRateService = async () => {
    return await this.freightRateDbManger.getAllFreightRate();
  };
}
