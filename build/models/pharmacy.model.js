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
// Database connection variable
var db;
// Function that gets passed a plain text passowrd and returns a hashed password using bcrypt
var hashPassowrd = function (password) {
    var salt = parseInt(config_1.default.salt);
    return bcrypt_1.default.hashSync(password + config_1.default.secret, salt);
};
// connecting to database
(0, db_1.connectToDb)(function (error) {
    if (!error) {
        db = (0, db_1.getDb)();
    }
    else {
        console.log("Failed to connect to database from the product model, ".concat(error));
    }
});
var PharmacyModel = /** @class */ (function () {
    function PharmacyModel() {
    }
    // Get all pharmacies
    PharmacyModel.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pharmacies, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('pharmacies')
                                .find()
                                .toArray()];
                    case 1:
                        pharmacies = (_a.sent());
                        return [2 /*return*/, pharmacies];
                    case 2:
                        error_1 = _a.sent();
                        console.log("Failed to get pharmacies, ".concat(error_1));
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get a pharmacy by id
    PharmacyModel.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var pharmacy, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('pharmacies')
                                .find({ _id: new mongodb_1.ObjectId(id) })
                                .project({ password: 0 })
                                .toArray()];
                    case 1:
                        pharmacy = (_a.sent())[0];
                        return [2 /*return*/, pharmacy];
                    case 2:
                        error_2 = _a.sent();
                        console.log("Failed to get pharmacy, ".concat(error_2));
                        return [2 /*return*/, {}];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Create a pharmacy
    PharmacyModel.prototype.create = function (pharmacy) {
        return __awaiter(this, void 0, void 0, function () {
            var passwordHashedObj, oldUser, newPharmacy, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        passwordHashedObj = {
                            name: pharmacy.name.toLowerCase(),
                            password: hashPassowrd(pharmacy.password),
                            email: pharmacy.email.toLowerCase()
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, db.collection('users').findOne({ email: pharmacy.email.toLowerCase() })];
                    case 2:
                        oldUser = _a.sent();
                        if (oldUser) {
                            return [2 /*return*/, 'User already exists'];
                        }
                        return [4 /*yield*/, db
                                .collection('pharmacies')
                                .insertOne(passwordHashedObj)];
                    case 3:
                        newPharmacy = (_a.sent());
                        return [2 /*return*/, newPharmacy];
                    case 4:
                        error_3 = _a.sent();
                        console.log("Failed to create pharmacy, ".concat(error_3));
                        return [2 /*return*/, {}];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Update a pharmacy
    PharmacyModel.prototype.update = function (id, pharmacy) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedPharmacy, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('pharmacies').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $set: {
                                    name: pharmacy.name,
                                    email: pharmacy.email.toLowerCase(),
                                    password: hashPassowrd(pharmacy.password)
                                }
                            })];
                    case 1:
                        updatedPharmacy = (_a.sent());
                        return [2 /*return*/, updatedPharmacy];
                    case 2:
                        error_4 = _a.sent();
                        console.log("Failed to update pharmacy, ".concat(error_4));
                        return [2 /*return*/, {}];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Delete a pharmacy
    PharmacyModel.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedPharmacy, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('pharmacies')
                                .deleteOne({ _id: new mongodb_1.ObjectId(id) })];
                    case 1:
                        deletedPharmacy = (_a.sent());
                        return [2 /*return*/, deletedPharmacy];
                    case 2:
                        error_5 = _a.sent();
                        console.log("Failed to delete pharmacy, ".concat(error_5));
                        return [2 /*return*/, {}];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get a pharmacy by email
    PharmacyModel.prototype.showByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var pharmacy, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('pharmacies').find({ email: email }).project({ password: 0 }).toArray()];
                    case 1:
                        pharmacy = (_a.sent())[0];
                        return [2 /*return*/, pharmacy];
                    case 2:
                        error_6 = _a.sent();
                        console.log("Failed to get pharmacy by email, ".concat(error_6));
                        return [2 /*return*/, {}];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return PharmacyModel;
}());
exports.default = PharmacyModel;
