import { IsNumber, IsString } from 'class-validator';

class WishlistDto {
  @IsString()
  user: string;

  @IsString()
  productId: string;
}

export default WishlistDto;
