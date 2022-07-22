import { IsBoolean, IsNumber, IsString } from "class-validator";

class BaseProductAvailability {
  @IsBoolean()
  isAreaCalculate: boolean;

  @IsBoolean()
  isCancelable: boolean;

  @IsBoolean()
  isRefundable: boolean;

  @IsBoolean()
  isReturnable: boolean;

  @IsBoolean()
  cashOnDeliverry: boolean;

  @IsBoolean()
  isOfferAvailable: boolean;

  @IsBoolean()
  isDeliveryChargeApplicable: boolean;
}

export default class ProductDTO extends BaseProductAvailability {
  @IsString()
  productName: string;

  @IsNumber()
  price: number;

  @IsString()
  taxType: string;

  @IsNumber()
  tax: number;

  @IsNumber()
  discountedPrice: number;

  @IsString()
  saleIn: string;

  @IsNumber()
  weight: number;

  @IsString()
  wightUnit: string;

  @IsNumber()
  height: number;

  @IsString()
  heightUnit: string;

  @IsNumber()
  length: number;

  @IsString()
  lengthUnit: string;

  @IsNumber()
  width: number;

  @IsString()
  widthUnit: string;

  @IsNumber()
  sku: number;

  @IsNumber()
  stock: number;

  @IsNumber()
  unitPerBox: number;

  @IsNumber()
  minimumQuantity: number;

  @IsNumber()
  maximumQuantity: number;

  @IsString()
  manufacturer: string;

  @IsString()
  madeIn: string;

  @IsString()
  image: string[];

  @IsString()
  description: string;
}
