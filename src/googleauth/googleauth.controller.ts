import { Request, Router, Response, NextFunction } from 'express';
import passport from 'passport';
import Controller from '../interfaces/controller.interface';
import * as jwt from 'jsonwebtoken';
import TokenData from '../interfaces/takenData.interface';
import DataStoredInToken from '../interfaces/dataStoredInToken.interface';
import IUser from '../user/user.interface';

class GoogleAuthController implements Controller {
  path = '/auth/google';
  router = Router();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      passport.authenticate('google', {
        scope: ['email', 'profile'],
      })
    );

    this.router.get(
      `${this.path}/callback`,
      passport.authenticate('google', { session: true }),
      this.googleCallback
    );
    this.router.get('/logout', this.googleLogout);
    this.router.get(`/user`, this.getUser);
  }

  private googleCallback = async (request: Request, response: Response) => {
    response.redirect('http://localhost:3000/googlesuccess');
  };

  private getUser = async (request: Request, response: Response) => {
    console.log(request.user);
    const user = request.user;
    const token = this.createToken(user);
    const cookie = this.createCookie(token);
    if (user) {
      response.setHeader('Set-Cookie', [cookie]);
      response.send({ user, token });
    } else {
      response.send('No user');
    }
  };

  private googleLogout = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (request.user) {
      response.setHeader('Set-Cookie', ['Authorization=;Max-Age=0']);
      request.logout((error) => {
        if (error) return next(error);
        response.send('LoggedOUt');
      });
    }
  };

  public createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }
  public createToken(user: any): TokenData {
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
