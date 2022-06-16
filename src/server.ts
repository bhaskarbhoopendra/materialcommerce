import "dotenv/config";
import AdminController from "./admin/admin.controller";
import AdminAuthenticationController from "./admin/adminAuthentication/adminAuthentication.controller";
import App from "./app";
import GoogleAuthController from "./googleauth/googleauth.controller";
import WarehouseController from "./warehouse/warehouse.controller";

const app = new App([new GoogleAuthController(),
   new AdminAuthenticationController(),
   new WarehouseController(),
   new AdminController()]);

app.listen();  
