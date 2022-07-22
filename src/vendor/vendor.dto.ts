import VerifiedStatus from "../enums/enums.vendor";
import UserDTO from "../user/user.dto";
import {
  IsString,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsNumber,
} from "class-validator";
import WarehouseDTo from "../warehouse/warehouse.dto";

class vendorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  phoneNumber: number;

  @IsString()
  organisation: string;

  @IsString()
  company: string;

  @IsEnum(VerifiedStatus)
  isConfirmedVendor: VerifiedStatus;

  @IsBoolean()
  isVendor: boolean;

  @IsOptional()
  @IsString()
  warehouse: WarehouseDTo;
}

export default vendorDto;
