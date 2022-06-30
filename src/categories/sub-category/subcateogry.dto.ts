import { IsString } from "class-validator";

export default class SubCategoryDto {
  @IsString()
  subcategoryName: string;

  @IsString()
  subcategoryImage: string;
}
