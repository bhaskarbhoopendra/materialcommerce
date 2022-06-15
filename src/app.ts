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
import "./config/google";
import "./config/passport";
import flash from "express-flash";
import bodyParser from "body-parser";

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
      console.log(clc.yellow(`Server is running on ${process.env.PORT}`));
    });
  }

  private initializeController(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeMiddleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(
      session({
        secret: "melody hensley is my spirit animal",
        resave: true,
        saveUninitialized: true,
      })
    );
    this.app.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    );
    this.app.use(flash());
    this.app.use(express.static(`${__dirname}/public`));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(bodyParser.urlencoded({ extended: true }))
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  private connectToDatabase = async () => {
    // try {
    //   const { DATABASE_URI } = process.env;
    //   await mongoose.connect(`${DATABASE_URI}`);
    //   console.log(clc.green.italic("connected to db"));
    // } catch (error) {
    //   console.log("Failed to connect To DB", error);
    // }

    const { DATABASE_URI } = process.env;
    await mongoose
      .connect(`${DATABASE_URI}`)
      .then(() => {
        console.log(clc.green.italic("Connected to db"));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export default App;
