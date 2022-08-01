import { IsNumber, IsString } from 'class-validator';

class CartDto {
  @IsString()
  user: string;

  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;
}

export default CartDto;
