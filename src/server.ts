import "dotenv/config";
import AdminAuthenticationController from "./admin/adminAuthentication/adminAuthentication.controller";
import App from "./app";
import GoogleAuthController from "./googleauth/googleauth.controller";

const app = new App([new GoogleAuthController(),
   new AdminAuthenticationController()]);

app.listen();
