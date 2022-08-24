import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/error.middleware";
import Controller from "./interfaces/controller.interface";
import morgan from "morgan";
import clc from "cli-color";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import "./config/passport";
import "./config/google";

class App {
  public app = express.application;
  public router = express.Router();

  constructor(controllers: Controller[]) {
    this.app = express();

    this.connectToDatabase();
    this.initializeMiddleware();
    this.initializeErrorHandling();
    this.initializeController(controllers);
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(clc.yellow(`App is running on ${process.env.PORT}`));
    });
  }

  private initializeController(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeMiddleware() {
    const { SESSION } = process.env;
    this.app.use(express.json());
    if (process.env.NODE_ENV === "production") {
      this.app.use(
        cors({
          origin: "http://localhost:5173",
          credentials: true,
        })
      );
      this.app.use(
        session({
          secret: `${SESSION}`,
          resave: true,
          saveUninitialized: true,
          cookie: {
            sameSite: "none",
            secure: true,
            maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
          },
        })
      );
    } else {
      this.app.use(
        cors({
          origin: "http://localhost:5173",
          credentials: true,
        })
      );
      this.app.use(
        session({
          secret: `${SESSION}`,
          resave: true,
          saveUninitialized: true,
        })
      );
    }
    this.app.set("trust proxy", 1);
    this.app.use(cookieParser());

    this.app.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    );
    this.app.use(express.static(`${__dirname}/public`));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  private connectToDatabase = async () => {
    const { DATABASE_URI } = process.env;
    await mongoose
      .connect(`${DATABASE_URI}`)
      .then(() => {
        console.log(clc.magenta.underline.italic("MongoDb Connected"));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export default App;
