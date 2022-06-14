import { Request, Router, Response, NextFunction } from "express";
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

    this.router.get("/logout", this.googleLogout);
  }

  private googleLogout = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    request.logout((error) => {
      if (error) return next(error);
      response.send("LoggedOUt");
    });
  };
}

export default GoogleAuthController;
