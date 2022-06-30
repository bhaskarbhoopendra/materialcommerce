import "dotenv/config";
import AdminController from "./admin/admin.controller";
import AdminAuthenticationController from "./admin/adminAuthentication/adminAuthentication.controller";
import App from "./app";
import AuthenticationController from "./authentication/authentication.controller";
import CategoryController from "./categories/category/category.controller";
import FreightRateController from "./freightrate/freightrate.controller";
import PincodeTypeController from "./freightrate/pincodetype/pincodetype.controller";
import ZoneController from "./freightrate/zone/zone.controller";
import GoogleAuthController from "./googleauth/googleauth.controller";
import ProductController from "./product/product.controller";
import VendorAuthenticationController from "./vendor/vendor.authentication.controller";
import WarehouseController from "./warehouse/warehouse.controller";

const app = new App([
  new GoogleAuthController(),
  new AdminAuthenticationController(),
  new ZoneController(),
  new PincodeTypeController(),
  new AuthenticationController(),
  new VendorAuthenticationController(),
  new WarehouseController(),
  new AdminController(),
  new ProductController(),
  new FreightRateController(),
  new CategoryController(),
]);

app.listen();
