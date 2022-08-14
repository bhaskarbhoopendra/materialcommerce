import mongoose from 'mongoose';
import IWishlist from './wishlist.interface';

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
  },
});

const WishlistModel = mongoose.model<IWishlist>('wishlist', wishlistSchema);

export default WishlistModel;
