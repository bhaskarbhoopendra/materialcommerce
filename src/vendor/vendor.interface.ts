import Iwarehouse from "../warehouse/warehouse.interface";

interface Ivendor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organization?: string;
  company?: string;
  isVendor?: boolean;
  isConfirmedVendor?: string;
  warehouse?: Iwarehouse[];
}

export default Ivendor;
