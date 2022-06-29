import "dotenv/config";
import AdminController from "./admin/admin.controller";
import AdminAuthenticationController from "./admin/adminAuthentication/adminAuthentication.controller";
import App from "./app";
import AuthenticationController from "./authentication/authentication.controller";
import ZoneController from "./freightrate/zone/zone.controller";
import GoogleAuthController from "./googleauth/googleauth.controller";
import VendorAuthenticationController from "./vendor/vendor.authentication.controller";
import WarehouseController from "./warehouse/warehouse.controller";

const app = new App([
  new GoogleAuthController(),
  new AdminAuthenticationController(),
  new ZoneController(),
  new AuthenticationController(),
  new VendorAuthenticationController(),
  new WarehouseController(),
  new AdminController(),
]);

app.listen();
