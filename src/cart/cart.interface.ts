import { Types } from 'mongoose';

interface ICart {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: string;
}

export default ICart;
