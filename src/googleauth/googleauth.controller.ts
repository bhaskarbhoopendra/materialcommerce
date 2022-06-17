import { Request, Router, Response, NextFunction } from "express";
import passport from "passport";
import Controller from "../interfaces/controller.interface";
import UserModel from "../user/user.model";
import * as jwt from "jsonwebtoken";
import TokenData from "../interfaces/takenData.interface";
import DataStoredInToken from "../interfaces/dataStoredInToken.interface";
import IUser from "../user/user.interface";

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

    this.router.get(`${this.path}/callback`, passport.authenticate("google"));
    this.router.get("/logout", this.googleLogout);
    this.router.get(`/user`, this.getUser);
  }

  private getUser = async (request: Request, response: Response) => {
    console.log(request.user);
    response.send(request.user);
  };

  private googleLogout = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    // request.logout((error) => {
    //   if (error) return next(error);
    //   response.send("LoggedOUt");
    // });
    if (request.user) {
      request.logout((error) => {
        if (error) return next(error);
        response.send("LoggedOUt");
      });
    }
  };

  public createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
  public createToken(user: IUser): TokenData {
    const expiresIn = 60 * 60; // an hour
    const { JWT_SECRET } = process.env;
    const dataStoredInToken: DataStoredInToken = {
      _id: user?._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, `${JWT_SECRET}`, { expiresIn }),
    };
  }
}

export default GoogleAuthController;

// private googleCallbackWithCookieAndToken = async (
//   request: Request,
//   response: Response
// ) => {
//   console.log("redirected", request.user);
//   // const profile = { ...request.user };
//   const newUser = {
//     googleId: request.user?.id,
//     email: request.user?.emails[0].value,
//     firstName: request.user?.name.givenName,
//     lastName: request.user?.name.familyName,
//     profilePhoto: request.user?.photos[0].value,
//     source: "google",
//   };

//   // const googleAuthService = new GoogleAuthService();
//   try {
//     const currentUser = await UserModel.findOne({
//       googleId: request.user?.id,
//     });
//     if (currentUser) {
//       const tokenData = this.createToken(currentUser);
//       response.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
//       response.send({ tokenData, currentUser });
//     } else {
//       const user: IUser = await UserModel.create(newUser);
//       const tokenData = this.createToken(user);
//       response.setHeader("Set-Cookie", [this.createCookie(tokenData)]);
//       response.send({ tokenData, user });
//     }
//   } catch (error) {
//     return error;
//   }
// };
