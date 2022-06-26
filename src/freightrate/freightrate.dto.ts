import { IsNumber, IsString } from "class-validator";

export default class FreightRateDto {
  @IsString()
  zone: string;

  @IsString()
  pincodeType: string;

  @IsString()
  weightType: string;

  @IsNumber()
  lowerbound: number;

  @IsNumber()
  upperbound: number;

  @IsNumber()
  rate: number;
}
