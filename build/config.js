"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var _a = process.env, PORT = _a.PORT, BCRYPT_SECRET = _a.BCRYPT_SECRET, SALT = _a.SALT, SIGNITURE = _a.SIGNITURE, MONGODB_STRING = _a.MONGODB_STRING, SENDGRID_API = _a.SENDGRID_API, SENDGRID_EMAIL = _a.SENDGRID_EMAIL, SENDGRID_TEMPLATE_ID = _a.SENDGRID_TEMPLATE_ID, MS_AZURE_CV_KEY = _a.MS_AZURE_CV_KEY, MS_AZURE_CV_URL = _a.MS_AZURE_CV_URL;
exports.default = {
    port: PORT,
    secret: BCRYPT_SECRET,
    salt: SALT,
    signiture: SIGNITURE,
    dbString: MONGODB_STRING,
    sendgridKey: SENDGRID_API,
    sendgridEmail: SENDGRID_EMAIL,
    sendgridTemplate: SENDGRID_TEMPLATE_ID,
    msAzureCVKey: MS_AZURE_CV_KEY,
    MSAzureCVURL: MS_AZURE_CV_URL
};
