import { CartDto } from "./cart.dto";

export default interface Icart {
  quantity: number;
  product: CartDto;
}
