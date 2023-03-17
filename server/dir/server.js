"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./src/database/db"));
const index_1 = __importDefault(require("./src/routers/index"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const port = process.env.PORT || 8080;
const app = (0, express_1.default)();
(0, db_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
/////////////////////////////////DISABLE CORS/////////////////////////////////////////
app.all("/*", (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", '*');
    next();
});
/////////////////////////////////DISABLE CORS/////////////////////////////////////////
app.use('/', index_1.default);
app.use('/feedback', express_1.default.static('/uploads/feedbackImg'));
app.use('/user', express_1.default.static('/uploads/userImg'));
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
