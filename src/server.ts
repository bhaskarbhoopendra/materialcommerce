import "dotenv/config";
import AdminAuthenticationController from "./admin/adminAuthentication/adminAuthentication.controller";
import App from "./app";
import PincodeTypeController from "./freightrate/pincodetype/pincodetype.controller";
import ZoneController from "./freightrate/zone/zone.controller";
import GoogleAuthController from "./googleauth/googleauth.controller";

const app = new App([
  new GoogleAuthController(),
  new AdminAuthenticationController(),
  new ZoneController(),
  new PincodeTypeController(),
]);

app.listen();
