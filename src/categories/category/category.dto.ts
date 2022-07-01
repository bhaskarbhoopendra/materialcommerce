import { IsString } from "class-validator";

export default class CategoryDto {
  @IsString()
  categoryName: string;

  @IsString()
  categoryImage: string | undefined;
}
