import { Router } from "express";
import passport from "passport";
import Controller from "../interfaces/controller.interface";

class GoogleAuthController implements Controller {
  path = "/auth/google";
  router = Router();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      passport.authenticate("google", {
        scope: ["email", "profile"],
      })
    );
    this.router.get(
      "/auth/google/callback",
      passport.authenticate("google", {
        failureRedirect: "/index.html",
        successRedirect: "/hello.html",
        failureFlash: true,
        successFlash: "Successfully logged in!",
      })
    );
  }
}

export default GoogleAuthController;
