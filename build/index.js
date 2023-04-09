"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var config_1 = __importDefault(require("./config"));
var product_1 = __importDefault(require("./handlers/product"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var user_1 = __importDefault(require("./handlers/user"));
var user_2 = __importDefault(require("./services/user"));
var product_2 = __importDefault(require("./services/product"));
var dashboard_1 = __importDefault(require("./services/dashboard"));
var insuranceCompany_1 = __importDefault(require("./handlers/insuranceCompany"));
var pharmacy_1 = __importDefault(require("./handlers/pharmacy"));
var pharmacy_2 = __importDefault(require("./services/pharmacy"));
var PORT = config_1.default.port;
// create an instance server
var app = (0, express_1.default)();
// HTTP request logger middleware
app.use((0, morgan_1.default)('short'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: '*' }));
app.listen(PORT, function () {
    console.log("Server is listening on port: ".concat(PORT));
});
(0, product_1.default)(app);
(0, product_2.default)(app);
(0, user_1.default)(app);
(0, user_2.default)(app);
(0, dashboard_1.default)(app);
(0, insuranceCompany_1.default)(app);
(0, pharmacy_1.default)(app);
(0, pharmacy_2.default)(app);
exports.default = app;
