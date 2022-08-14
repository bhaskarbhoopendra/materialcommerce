import { Types } from 'mongoose';
import CartDto from './cart.dto';

interface ICart {
  user: string;
  products: [
    {
      productId: string;
      quantity: number;
    }
  ];
}

export default ICart;
