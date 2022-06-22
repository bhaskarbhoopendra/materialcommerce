"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const morgan_1 = __importDefault(require("morgan"));
const cli_color_1 = __importDefault(require("cli-color"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
require("./config/google");
require("./config/passport");
const express_flash_1 = __importDefault(require("express-flash"));
class App {
    constructor(controllers) {
        this.app = express_1.default.application;
        this.router = express_1.default.Router();
        this.connectToDatabase = async () => {
            // try {
            //   const { DATABASE_URI } = process.env;
            //   await mongoose.connect(`${DATABASE_URI}`);
            //   console.log(clc.green.italic("connected to db"));
            // } catch (error) {
            //   console.log("Failed to connect To DB", error);
            // }
            const { DATABASE_URI } = process.env;
            await mongoose_1.default
                .connect(`${DATABASE_URI}`)
                .then(() => {
                console.log(cli_color_1.default.green.italic("Connected to db"));
            })
                .catch((err) => {
                console.log(err);
            });
        };
        this.app = (0, express_1.default)();
        this.connectToDatabase();
        this.initializeMiddleware();
        this.initializeErrorHandling();
        this.initializeController(controllers);
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(cli_color_1.default.yellow(`Server is running on ${process.env.PORT}`));
        });
    }
    initializeController(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }
    initializeMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            origin: "http://localhost:3000",
            credentials: true,
        }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, express_session_1.default)({
            secret: "melody hensley is my spirit animal",
            resave: true,
            saveUninitialized: true,
        }));
        this.app.use((0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms"));
        this.app.use((0, express_flash_1.default)());
        this.app.use(express_1.default.static(`${__dirname}/public`));
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
}
exports.default = App;
