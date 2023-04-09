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
var UserServices = /** @class */ (function () {
    function UserServices() {
    }
    // Verifying the user email and password by comparing them to the ones in the database
    UserServices.prototype.verifyLogin = function (password, userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('users')
                                .findOne({ email: userEmail.toLowerCase() })];
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
    // Adding an address to an existing user using their ID
    UserServices.prototype.addAddress = function (id, userAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $set: {
                                    address: userAddress
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error("Could not add address for user with id ".concat(id, " ").concat(error_2));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Adding a phone number to an existing user using their ID
    UserServices.prototype.addPhoneNumber = function (id, userPhoneNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $set: {
                                    phoneNumber: userPhoneNumber
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error("Could not add phone number for user with id ".concat(id, " ").concat(error_3));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Adding an age to an existing user using their ID
    UserServices.prototype.addAge = function (id, userAge) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $set: {
                                    age: userAge
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_4 = _a.sent();
                        throw new Error("Could not add age for user with id ".concat(id, " ").concat(error_4));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Adding an gender to an existing user using their ID
    UserServices.prototype.addGender = function (id, userGender) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $set: {
                                    gender: userGender.toLowerCase()
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_5 = _a.sent();
                        throw new Error("Could not add gender for user with id ".concat(id, " ").concat(error_5));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Getting all previous orders from a user
    UserServices.prototype.getOrderHistory = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('users')
                                .find({ _id: new mongodb_1.ObjectId(id) })
                                .project({ orderHistory: 1 })
                                .toArray()];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_6 = _a.sent();
                        throw new Error("Could not get order history for user with id ".concat(id, " ").concat(error_6));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Updating order history for a user using their ID
    UserServices.prototype.updateOrderHistory = function (id, userOrder) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userOrder.products.forEach(function (product) { return (product._id = new mongodb_1.ObjectId(product._id)); });
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $push: {
                                    orderHistory: userOrder
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_7 = _a.sent();
                        throw new Error("Could not update order history for user with id ".concat(id, " ").concat(error_7));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Removing order history item for a user using their ID
    UserServices.prototype.removeOrderHistory = function (id, orderHistoryId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $pull: {
                                    orderHistory: {
                                        _id: new mongodb_1.ObjectId(orderHistoryId)
                                    }
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_8 = _a.sent();
                        throw new Error("Could not remove order from history for user with id ".concat(id, " ").concat(error_8));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Getting all favorite products from a user
    UserServices.prototype.getFavorites = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('users')
                                .find({ _id: new mongodb_1.ObjectId(id) })
                                .project({ favorites: 1 })
                                .toArray()];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_9 = _a.sent();
                        throw new Error("Could not get favorite products for user with id ".concat(id, " ").concat(error_9));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Updating favorite products for a user using their ID
    UserServices.prototype.updateFavorites = function (id, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $push: {
                                    favorites: new mongodb_1.ObjectId(productId)
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_10 = _a.sent();
                        throw new Error("Could not update favorite products for user with id ".concat(id, " ").concat(error_10));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Removing favorite product for a user using their ID
    UserServices.prototype.removeFavorites = function (id, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $pull: {
                                    favorites: new mongodb_1.ObjectId(productId)
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_11 = _a.sent();
                        throw new Error("Could not remove favorite product for user with id ".concat(id, " ").concat(error_11));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Getting all search history items for a user using their ID
    UserServices.prototype.getSearchHistory = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('users')
                                .find({ _id: new mongodb_1.ObjectId(id) })
                                .project({ searchHistory: 1 })
                                .toArray()];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_12 = _a.sent();
                        throw new Error("Could not search history for user with id ".concat(id, " ").concat(error_12));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Updating search history for a user
    UserServices.prototype.updateSearchHistory = function (id, query) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $push: {
                                    searchHistory: query
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_13 = _a.sent();
                        throw new Error("Could not update search history for user with id ".concat(id, " ").concat(error_13));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Removing search history item for a user using their ID
    UserServices.prototype.removeSearchHistory = function (id, query) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $pull: {
                                    searchHistory: query
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_14 = _a.sent();
                        throw new Error("Could not remove search history item for user with id ".concat(id, " ").concat(error_14));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Getting all alarms for a user using their ID
    UserServices.prototype.getAlarms = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').findOne({ _id: new mongodb_1.ObjectId(id) })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result === null || result === void 0 ? void 0 : result.alarms];
                    case 2:
                        error_15 = _a.sent();
                        throw new Error("Could not get alarms for user with id ".concat(id, " ").concat(error_15));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Adding an alarm for a user
    UserServices.prototype.addAlarm = function (id, alarm) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $push: {
                                    alarms: alarm
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_16 = _a.sent();
                        throw new Error("Could not add alarm for user with id ".concat(id, " ").concat(error_16));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Edit an alarm for a user
    UserServices.prototype.editAlarm = function (id, alarmId, alarm) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id), 'alarms._id': new mongodb_1.ObjectId(alarmId) }, {
                                $set: {
                                    'alarms.$': alarm
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_17 = _a.sent();
                        throw new Error("Could not edit alarm with id ".concat(alarmId, " for user with id ").concat(id, " ").concat(error_17));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Removing an alarm for a user using their ID
    UserServices.prototype.removeAlarm = function (id, alarmId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $pull: {
                                    alarms: {
                                        _id: new mongodb_1.ObjectId(alarmId)
                                    }
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_18 = _a.sent();
                        throw new Error("Could not remove order from history for user with id ".concat(id, " ").concat(error_18));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Getting all cart items from a user
    UserServices.prototype.getCartItems = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('users')
                                .find({ _id: new mongodb_1.ObjectId(id) })
                                .project({ cart: 1, _id: 0 })
                                .toArray()];
                    case 1:
                        result = (_a.sent())[0];
                        return [2 /*return*/, result];
                    case 2:
                        error_19 = _a.sent();
                        throw new Error("Could not get cart items for user with id ".concat(id, " ").concat(error_19));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Updating cart items for a user using their ID
    UserServices.prototype.updateCartItems = function (id, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var product, error_20, cartIem, result, error_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('products')
                                .findOne({ _id: new mongodb_1.ObjectId(productId) })];
                    case 1:
                        product = (_a.sent());
                        return [3 /*break*/, 3];
                    case 2:
                        error_20 = _a.sent();
                        throw new Error("Could not get product with id ".concat(productId, " ").concat(error_20));
                    case 3:
                        cartIem = {
                            product: product,
                            quantity: 1
                        };
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $push: {
                                    cart: cartIem
                                }
                            })];
                    case 5:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 6:
                        error_21 = _a.sent();
                        throw new Error("Could not update cart items for user with id ".concat(id, " ").concat(error_21));
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // Increment cart items quantity for a user using their ID
    UserServices.prototype.incrementCartItem = function (id, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id), 'cart.product._id': new mongodb_1.ObjectId(productId) }, {
                                $inc: {
                                    'cart.$.quantity': 1
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_22 = _a.sent();
                        throw new Error("Could not increment cart items for user with id ".concat(id, " ").concat(error_22));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Decrement cart items quantity for a user using their ID
    UserServices.prototype.decrementCartItem = function (id, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id), 'cart.product._id': new mongodb_1.ObjectId(productId) }, {
                                $inc: {
                                    'cart.$.quantity': -1
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_23 = _a.sent();
                        throw new Error("Could not decrement cart items for user with id ".concat(id, " ").concat(error_23));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Removing cart items for a user using their ID
    UserServices.prototype.removeCartItem = function (id, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $pull: {
                                    cart: {
                                        'product._id': new mongodb_1.ObjectId(productId)
                                    }
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_24 = _a.sent();
                        throw new Error("Could not remove favorite product for user with id ".concat(id, " ").concat(error_24));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Update user's name, email, and/or phone number
    UserServices.prototype.updateProfile = function (id, name, email, phone, gender) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_25;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $set: {
                                    name: name,
                                    email: email,
                                    phoneNumber: phone,
                                    gender: gender
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_25 = _a.sent();
                        throw new Error("Could not update profile for user with id ".concat(id, " ").concat(error_25));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Update user's password
    UserServices.prototype.updatePassword = function (id, password) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $set: {
                                    password: hashPassowrd(password)
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_26 = _a.sent();
                        throw new Error("Could not update password for user with id ".concat(id, " ").concat(error_26));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Add insurance card for a user
    UserServices.prototype.addInsuranceCard = function (id, insuranceCard) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_27;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.collection('users').updateOne({ _id: new mongodb_1.ObjectId(id) }, {
                                $push: {
                                    insuranceCards: insuranceCard
                                }
                            })];
                    case 1:
                        result = (_a.sent());
                        return [2 /*return*/, result];
                    case 2:
                        error_27 = _a.sent();
                        throw new Error("Could not add insurance card for user with id ".concat(id, " ").concat(error_27));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Get insurance cards for a user
    UserServices.prototype.getInsuranceCards = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_28;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db
                                .collection('users')
                                .find({ _id: new mongodb_1.ObjectId(id) })
                                .project({ insuranceCards: 1, _id: 0 })
                                .toArray()];
                    case 1:
                        result = (_a.sent())[0];
                        if (result.insuranceCards) {
                            return [2 /*return*/, result.insuranceCards];
                        }
                        else {
                            return [2 /*return*/, []];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_28 = _a.sent();
                        throw new Error("Could not get insurance cards for user with id ".concat(id, " ").concat(error_28));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return UserServices;
}());
exports.default = UserServices;
