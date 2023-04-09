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
var db_1 = require("../database/db");
var mongodb_1 = require("mongodb");
var bcrypt_1 = __importDefault(require("bcrypt"));
var config_1 = __importDefault(require("../config"));
// Function that gets passed a plain text passowrd and returns a hashed password using bcrypt
var hashPassowrd = function (password) {
    var salt = parseInt(config_1.default.salt);
    return bcrypt_1.default.hashSync(password + config_1.default.secret, salt);
};
// Function that gets passed a plain text passowrd and returns a hashed password using bcrypt
var comparePassword = function (password, hashed) {
    return bcrypt_1.default.compareSync(password + config_1.default.secret, hashed);
};
// Database connection variable
var db;
// connecting to database
(0, db_1.connectToDb)(function (error) {
    if (!error) {
        db = (0, db_1.getDb)();
    }
    else {
        console.log("Failed to connect to database from the product model, ".concat(error));
    }
});
var PharmacyServices = /** @class */ (function () {
    function PharmacyServices() {
    }
    // Verifying the user email and password by comparing them to the ones in the database
    PharmacyServices.prototype.verifyLogin = function (password, email) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('pharmacies')
                                .findOne({ email: email.toLowerCase() })];
                    case 1:
                        result = (_a.sent());
                        if (!result)
                            return [2 /*return*/, false];
                        if (comparePassword(password, result.password))
                            return [2 /*return*/, result];
                        return [2 /*return*/, false];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error("Could not retrieve user email ".concat(error_1));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Update pharmacy's name, email, and/or phone number
    PharmacyServices.prototype.updateProfile = function (id, name, email, phone) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('pharmacies').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $set: {
                                    name: name,
                                    email: email,
                                    phoneNumber: phone
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error("Could not update profile for pharmacy with id ".concat(id, " ").concat(error_2));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Update pharmacy's password
    PharmacyServices.prototype.updatePassword = function (id, password) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('pharmacies').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $set: {
                                    password: hashPassowrd(password)
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error("Could not update password for pharmacy with id ".concat(id, " ").concat(error_3));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get pharmacies that have a list of products
    PharmacyServices.prototype.getpharmacies = function (products) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('pharmacies')
                                .find({ 'products._id': { $all: products } })
                                .project({ password: 0, products: 0 })
                                .toArray()];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_4 = _a.sent();
                        throw new Error("Could not retrieve pharmacies ".concat(error_4));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PharmacyServices;
}());
exports.default = PharmacyServices;
