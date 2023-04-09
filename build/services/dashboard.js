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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mail_1 = __importDefault(require("@sendgrid/mail"));
var config_1 = __importDefault(require("../config"));
var axios_1 = __importDefault(require("axios"));
var productServices_model_1 = __importDefault(require("../models/productServices.model"));
// Configure SendGrid
mail_1.default.setApiKey(config_1.default.sendgridKey);
// Instantiate Product Services Model
var productServicesModel = new productServices_model_1.default();
// Function to generate random code
var code = function () { return Math.floor(1000 + Math.random() * 9000).toString(); };
var createEmail = function (email) { return __awaiter(void 0, void 0, void 0, function () {
    var verificationCode, msg, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                verificationCode = code();
                msg = {
                    to: email,
                    from: config_1.default.sendgridEmail,
                    subject: 'تغيير كلمة المرور',
                    test: 'test message from sendgrid',
                    templateId: config_1.default.sendgridTemplate,
                    dynamic_template_data: {
                        one: verificationCode[0],
                        two: verificationCode[1],
                        three: verificationCode[2],
                        four: verificationCode[3]
                    }
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, mail_1.default.send(msg)];
            case 2:
                _a.sent();
                return [2 /*return*/, verificationCode];
            case 3:
                error_1 = _a.sent();
                console.log("Unable to send email, ".concat(error_1));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var sendEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var verificationCode, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, createEmail(req.params.to)];
            case 1:
                verificationCode = _a.sent();
                res.send({ code: verificationCode });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500);
                res.json("Unable to send email, ".concat(error_2));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var imageSearch = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var axiosConfig, data, imageResult, imageContent, searchResults, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                axiosConfig = {
                    headers: {
                        'Ocp-Apim-Subscription-Key': config_1.default.msAzureCVKey
                    }
                };
                data = {
                    url: req.body.imageURL
                };
                return [4 /*yield*/, axios_1.default.post(config_1.default.MSAzureCVURL, data, axiosConfig)];
            case 1:
                imageResult = _a.sent();
                imageContent = imageResult.data.readResult.content;
                if (!imageContent) return [3 /*break*/, 3];
                return [4 /*yield*/, productServicesModel.search(imageContent)];
            case 2:
                searchResults = _a.sent();
                if (searchResults.length > 0) {
                    res.send(searchResults);
                }
                else {
                    res.send(false);
                }
                return [3 /*break*/, 4];
            case 3:
                res.send(false);
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _a.sent();
                res.status(500);
                res.json("Unable to search for image, ".concat(error_3));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
var dashboard_routes = function (app) {
    app.get('/email/:to', sendEmail);
    app.post('/imageSearch', imageSearch);
};
exports.default = dashboard_routes;
