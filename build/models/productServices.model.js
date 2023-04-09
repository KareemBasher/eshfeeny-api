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
// Product servicecs class
var ProductServicesModel = /** @class */ (function () {
    function ProductServicesModel() {
    }
    // Show all products from a certain category
    ProductServicesModel.prototype.getCategory = function (category) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('products')
                                .find({ category: category })
                                .toArray()];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error("Unable to find products from category ".concat(category, ", ").concat(error_1));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Search for products using the name in Arabic or English, description, and the use cases
    ProductServicesModel.prototype.search = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('products')
                                .aggregate([
                                {
                                    $search: {
                                        compound: {
                                            should: [
                                                {
                                                    autocomplete: {
                                                        query: query,
                                                        path: 'nameEn'
                                                    }
                                                },
                                                {
                                                    autocomplete: {
                                                        query: query,
                                                        path: 'category'
                                                    }
                                                },
                                                {
                                                    autocomplete: {
                                                        query: query,
                                                        path: 'nameAr'
                                                    }
                                                },
                                                {
                                                    autocomplete: {
                                                        query: query,
                                                        path: 'useCases'
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                }
                            ])
                                .toArray()];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error("Unable to find products containing ".concat(query, ", ").concat(error_2));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get all products in users order history
    ProductServicesModel.prototype.getOrderHistoryProducts = function (userId, orderHistoryId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var productIds, result, order, error_3, result, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        productIds = [];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, db
                                .collection('users')
                                .findOne({ _id: new mongodb_1.ObjectId(userId) })];
                    case 2:
                        result = (_b.sent());
                        order = (_a = result.orderHistory) === null || _a === void 0 ? void 0 : _a.filter(function (order) {
                            return order._id.equals(new mongodb_1.ObjectId(orderHistoryId));
                        })[0];
                        order.products.forEach(function (product) { return productIds.push(product._id); });
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _b.sent();
                        throw new Error("Unable to find products from order history array for user ".concat(userId, ", ").concat(error_3));
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, db
                                .collection('products')
                                .find({ _id: { $in: productIds } })
                                .toArray()];
                    case 5:
                        result = (_b.sent());
                        return [2 /*return*/, result];
                    case 6:
                        error_4 = _b.sent();
                        throw new Error("Unable to find products from order history array for user ".concat(userId, ", ").concat(error_4));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // Get all favorite products for a user using their IDs
    ProductServicesModel.prototype.getFavoriteProducts = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_5, result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('users')
                                .findOne({ _id: new mongodb_1.ObjectId(userId) })];
                    case 1:
                        user = (_a.sent());
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        throw new Error("Unable to find product ids from favorites for user ".concat(userId, ", ").concat(error_5));
                    case 3:
                        _a.trys.push([3, 7, , 8]);
                        if (!user.favorites) return [3 /*break*/, 5];
                        return [4 /*yield*/, db
                                .collection('products')
                                .find({ _id: { $in: user === null || user === void 0 ? void 0 : user.favorites } })
                                .toArray()];
                    case 4:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 5: return [2 /*return*/, []];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_6 = _a.sent();
                        throw new Error("Unable to find products from favorites for user ".concat(userId, ", ").concat(error_6));
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // Show all products that have a certain active ingredient
    ProductServicesModel.prototype.getAlternative = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var product, result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, db
                                .collection('products')
                                .findOne({ _id: new mongodb_1.ObjectId(id) })];
                    case 1:
                        product = (_a.sent());
                        return [4 /*yield*/, db
                                .collection('products')
                                .find({ activeIngredient: product.activeIngredient, _id: { $ne: new mongodb_1.ObjectId(id) } })
                                .toArray()];
                    case 2:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 3:
                        error_7 = _a.sent();
                        throw new Error("Unable to find alternative to ".concat(id, ", ").concat(error_7));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Show all products from a certain type
    ProductServicesModel.prototype.getType = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('products')
                                .find({ type: type })
                                .toArray()];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_8 = _a.sent();
                        throw new Error("Unable to find products from type ".concat(type, ", ").concat(error_8));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get cart items from user (ids and quantity)
    ProductServicesModel.prototype.checkCart = function (userId, productId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var result, quantity_1, error_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').findOne({
                                _id: new mongodb_1.ObjectId(userId)
                            })];
                    case 1:
                        result = (_b.sent());
                        quantity_1 = 0;
                        if (result.cart) {
                            (_a = result.cart) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
                                var _a;
                                var id = (_a = item.product._id) !== null && _a !== void 0 ? _a : new mongodb_1.ObjectId();
                                if (id.equals(new mongodb_1.ObjectId(productId))) {
                                    quantity_1 = item.quantity;
                                }
                            });
                        }
                        return [2 /*return*/, quantity_1];
                    case 2:
                        error_9 = _b.sent();
                        console.log(error_9);
                        throw new Error("Unable to find products from cart for user ".concat(userId, ", ").concat(error_9));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Show all products from a certain brand
    ProductServicesModel.prototype.getBrand = function (brand) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('products')
                                .find({ brand: brand })
                                .toArray()];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_10 = _a.sent();
                        throw new Error("Unable to find products from brand ".concat(brand, ", ").concat(error_10));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ProductServicesModel;
}());
exports.default = ProductServicesModel;
