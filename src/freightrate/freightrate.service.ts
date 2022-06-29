import FreightRateDbManager from "./freightrate.dbmanager";
import FreightRateDto from "./freightrate.dto";
import FreightRateModel from "./freightrate.model";

export default class FreigthRateService {
  freightRatemodel = FreightRateModel;
  freightRateDbManger = new FreightRateDbManager();
  constructor() {}

  // createFreightRateService = async (
  //   zoneId: string,
  //   pincodeTypeId: string,
  //   freightRateData: FreightRateDto
  // ): Promise<FreightRateDto> => {
  //   const { weightType, lowerbound, upperbound, rate } = freightRateData;
  //   const newFreightRate = {
  //     zone: zoneId,
  //     pincodeType: pincodeTypeId,
  //     weightType,
  //     lowerbound,
  //     upperbound,
  //     rate,
  //   };
  //   const freightRate: FreightRateDto =
  //     await this.freightRateDbManger.createFreightRate(newFreightRate);
  //   return freightRate;
  // };

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

  getAllFreightRate = async () => {
    return await this.freightRateDbManger.getAllFreightRate();
  };
}
