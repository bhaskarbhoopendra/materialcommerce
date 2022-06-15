import "dotenv/config";
import App from "./app";
import authenticationController from "./authentication/authentication.controller";
import GoogleAuthController from "./googleauth/googleauth.controller";

const app = new App([
  new GoogleAuthController(),
  new authenticationController()
]);

app.listen();
