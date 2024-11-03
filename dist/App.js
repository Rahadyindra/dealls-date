"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: __dirname + "/../.env" });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Connection_1 = __importDefault(require("./database/Connection"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Index_1 = __importDefault(require("./routes/Index"));
const ErrorHandler_1 = require("./middlewares/ErrorHandler");
const Seeder_1 = require("./database/seeders/Seeder");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use("/", Index_1.default);
app.use(ErrorHandler_1.errorHandler);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Connection_1.default.sync({ alter: true });
        yield (0, Seeder_1.seed)();
        app.listen(port, () => {
            console.log(`now listening to ${port}`);
        });
    }
    catch (err) {
        console.error(`Failed to connect to server` + err);
    }
}))();
