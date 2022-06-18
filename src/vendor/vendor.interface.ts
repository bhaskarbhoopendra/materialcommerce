import IUser from "../user/user.interface";

interface Ivendor extends IUser {
  organization?: string;
  company?: string;
  isVendor?: boolean;
  isConfirmedVendor?: string;
  warehouse?: string[];
}

export default Ivendor;