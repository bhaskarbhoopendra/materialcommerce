import { Types } from 'mongoose';
import WishlistDto from './wishlist.dto';

interface IWishlist {
  userId: string;
  productId: string;
}

export default IWishlist;
