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
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("../database/db");
var mongodb_1 = require("mongodb");
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
// Product class
var ProductModel = /** @class */ (function () {
    function ProductModel() {
    }
    // Showing all products
    ProductModel.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('products').find().toArray()];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error("Unable to show products, ".concat(error_1));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Showing a single product using its ID
    ProductModel.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('products')
                                .findOne({ _id: new mongodb_1.ObjectId(id) })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error("Unable to show product with id ".concat(id, ", ").concat(error_2));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Adding a product
    ProductModel.prototype.create = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('products').insertOne(product)];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error("Unable to create product, ".concat(error_3));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Updating a single product using its ID
    ProductModel.prototype.update = function (product, id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('products').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $set: {
                                    nameAr: product.nameAr,
                                    nameEn: product.nameEn,
                                    description: product.description,
                                    price: product.price,
                                    volume: product.volume,
                                    amount: product.amount,
                                    useCases: product.useCases,
                                    activeIngredient: product.activeIngredient,
                                    sideEffects: product.sideEffects,
                                    type: product.type,
                                    category: product.category,
                                    usage: product.usage,
                                    warning: product.warning,
                                    brand: product.brand
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_4 = _a.sent();
                        throw new Error("Unable to update product with id ".concat(id, ", ").concat(error_4));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Deleting a product Using its ID
    ProductModel.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('products')
                                .deleteOne({ _id: new mongodb_1.ObjectId(id) })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_5 = _a.sent();
                        throw new Error("Unable to delete product with id ".concat(id, ", ").concat(error_5));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductModel.prototype.getMany = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('products')
                                .find({ _id: { $in: ids.map(function (id) { return new mongodb_1.ObjectId(id); }) } })
                                .toArray()];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_6 = _a.sent();
                        throw new Error("Unable to get products with ids ".concat(ids, ", ").concat(error_6));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ProductModel;
}());
exports.default = ProductModel;
