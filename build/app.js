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
require("./config/passport");
require("./config/google");
class App {
    constructor(controllers) {
        this.app = express_1.default.application;
        this.router = express_1.default.Router();
        this.connectToDatabase = async () => {
            const { DATABASE_URI } = process.env;
            await mongoose_1.default
                .connect(`${DATABASE_URI}`)
                .then(() => {
                console.log(cli_color_1.default.magenta.underline.italic("MongoDb Connected"));
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
            console.log(cli_color_1.default.yellow(`App is running on ${process.env.PORT}`));
        });
    }
    initializeController(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }
    initializeMiddleware() {
        const { SESSION } = process.env;
        this.app.use(express_1.default.json());
        if (process.env.NODE_ENV === "production") {
            this.app.use((0, cors_1.default)({
                origin: "http://localhost:5173",
                credentials: true,
            }));
            this.app.use((0, express_session_1.default)({
                secret: `${SESSION}`,
                resave: true,
                saveUninitialized: true,
                cookie: {
                    sameSite: "none",
                    secure: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7, // One Week
                },
            }));
        }
        else {
            this.app.use((0, cors_1.default)({
                origin: "http://localhost:5173",
                credentials: true,
            }));
            this.app.use((0, express_session_1.default)({
                secret: `${SESSION}`,
                resave: true,
                saveUninitialized: true,
            }));
        }
        this.app.set("trust proxy", 1);
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms"));
        this.app.use(express_1.default.static(`${__dirname}/public`));
        this.app.use(passport_1.default.initialize());
        this.app.use(passport_1.default.session());
    }
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
}
exports.default = App;
