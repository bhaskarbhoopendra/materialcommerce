interface Base {
  productName: string;
  price: number;
  taxType: string;
  tax: number;
  discountedPrice: number;
  partPrice: number; //need to confirm
  saleIn: string;
  weight: number;
  wightUnit: number;
  height: number;
  heightUnit: string;
  length: number;
  lengthUnit: string;
  width: number;
  widthUnit: string;
  sku: number;
  stock: number;
  unitPerBox: number;
  minimumQuantity: number;
  maximumQuantity: number;
  manufacturer: string;
  madeIn: string;
  image: string[];
  description: string;
}

interface productDeliverables extends Base {
  isAreaCalculate: boolean;
  isCancelable: boolean;
  isRefundable: boolean;
  isReturnable: boolean;
  cashOnDeliverry: boolean;
  //   frequntlyBoughtTogether: boolean;  TODO
  isOfferAvailable: boolean;
  isDeliveryChargeApplicable: boolean;
}

interface IProduct extends productDeliverables {
  _id: string;
}

export default IProduct;
