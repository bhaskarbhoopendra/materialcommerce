import "dotenv/config";
import App from "./app";
import GoogleAuthController from "./googleauth/googleauth.controller";

const app = new App([new GoogleAuthController()]);

app.listen();
