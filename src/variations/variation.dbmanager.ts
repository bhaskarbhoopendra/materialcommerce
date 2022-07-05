import VariationModel from "./variatioin.model";

export default class VariationDbManger {
  variationmodel = VariationModel;
  constructor() {}

  createVariation = async (data: any) => {
    return await this.variationmodel.create({ ...data });
  };

  updateVariationById = async (variationId: string, data: any) => {
    return await this.variationmodel.findByIdAndUpdate(
      variationId,
      { ...data },
      { new: true }
    );
  };

  variationById = async (variationId: string) => {
    return await this.variationmodel.findById(variationId).lean();
  };

  variationByIdAndDelete = async (variationId: string) => {
    return await this.variationmodel.findByIdAndDelete(variationId);
  };
}
