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
var userSerices_model_1 = __importDefault(require("../models/userSerices.model"));
var mongodb_1 = require("mongodb");
// Instantiate UserModel class
var userServicesModel = new userSerices_model_1.default();
// Verifying user for login
var verify = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.verifyLogin(req.body.password, req.body.email)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500);
                res.json(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Adding an address for a user
var addAddress = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.addAddress(req.params.id, req.body.address)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500);
                res.json(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Adding a phone number for a user
var addPhoneNumber = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.addPhoneNumber(req.params.id, req.body.phoneNumber)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500);
                res.json(error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Adding an age for a user
var addAge = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.addAge(req.params.id, req.body.age)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500);
                res.json(error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Adding an gebder for a user
var addGender = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.addGender(req.params.id, req.body.gender)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                res.status(500);
                res.json(error_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Getting all previous orders from a user
var getOrderHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.getOrderHistory(req.params.id)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(500);
                res.json(error_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Updating order history for a user using their ID
var addOrderHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderHistory, result, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderHistory = {
                    _id: new mongodb_1.ObjectId(),
                    products: req.body.products,
                    total: req.body.total
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userServicesModel.updateOrderHistory(req.params.id, orderHistory)];
            case 2:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                res.status(500);
                res.json(error_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Removing order history for a user using their ID
var removeOrderHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_8;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.removeOrderHistory(req.params.id, req.params.orderHistoryId)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_8 = _a.sent();
                res.status(500);
                res.json(error_8);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Getting all favorites from a user
var getFavorites = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_9;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.getFavorites(req.params.id)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_9 = _a.sent();
                res.status(500);
                res.json(error_9);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Updating favorite product for a user using their ID
var addFavoriteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.updateFavorites(req.params.id, req.body.productId)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_10 = _a.sent();
                res.status(500);
                res.json(error_10);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Removing favorite product for a user using their ID
var removeFavoriteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_11;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.removeFavorites(req.params.id, req.params.productId)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_11 = _a.sent();
                res.status(500);
                res.json(error_11);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Getting all search history items for a user using their ID
var getSearchHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_12;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.getSearchHistory(req.params.id)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_12 = _a.sent();
                res.status(500);
                res.json(error_12);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Updating search history for a user
var updateSearchHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.updateSearchHistory(req.params.id, req.body.query)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_13 = _a.sent();
                res.status(500);
                res.json(error_13);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Removing search history item for a user using their ID
var removeSearchHistory = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_14;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.removeSearchHistory(req.params.id, req.params.query)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_14 = _a.sent();
                res.status(500);
                res.json(error_14);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Getting all alarms for a user using their ID
var getAlarms = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_15;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.getAlarms(req.params.id)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_15 = _a.sent();
                res.status(500);
                res.json(error_15);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Adding an alarm for a user
var addAlarm = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var alarmObject, result, error_16;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                alarmObject = {
                    _id: new mongodb_1.ObjectId(),
                    name: req.body.name,
                    notes: req.body.notes,
                    dose: req.body.dose,
                    repetition: req.body.repetition.toLowerCase(),
                    alarmTime: req.body.alarmTime,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    days: req.body.days
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userServicesModel.addAlarm(req.params.id, alarmObject)];
            case 2:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                error_16 = _a.sent();
                res.status(500);
                res.json(error_16);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Edit an alarm for a user
var editAlarm = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var alarmObject, result, error_17;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                alarmObject = {
                    _id: new mongodb_1.ObjectId(req.params.alarmId),
                    name: req.body.name,
                    notes: req.body.notes,
                    dose: req.body.dose,
                    repetition: req.body.repetition.toLowerCase(),
                    alarmTime: req.body.alarmTime,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    days: req.body.days
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, userServicesModel.editAlarm(req.params.id, req.params.alarmId, alarmObject)];
            case 2:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 4];
            case 3:
                error_17 = _a.sent();
                res.status(500);
                res.json(error_17);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// Getting all cart items from a user
var getCartItems = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_18;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.getCartItems(req.params.id)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_18 = _a.sent();
                res.status(500);
                res.json(error_18);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Updating cart items for a user using their ID
var addCartItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_19;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.updateCartItems(req.params.id, req.body.productId)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_19 = _a.sent();
                res.status(500);
                res.json(error_19);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Removing favorite product for a user using their ID
var removeCartItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_20;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.removeCartItem(req.params.id, req.params.productId)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_20 = _a.sent();
                res.status(500);
                res.json(error_20);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Removing order history for a user using their ID
var removeAlarm = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_21;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.removeAlarm(req.params.id, req.params.alarmId)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_21 = _a.sent();
                res.status(500);
                res.json(error_21);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Incrementing the quantity of a product in the cart for a user
var incrementCartItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_22;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.incrementCartItem(req.params.id, req.params.productId)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_22 = _a.sent();
                res.status(500);
                res.json(error_22);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Decrementing the quantity of a product in the cart for a user
var decrementCartItem = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_23;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.decrementCartItem(req.params.id, req.params.productId)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_23 = _a.sent();
                res.status(500);
                res.json(error_23);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Update user's name, email, and/or phone number
var updateProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_24;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.updateProfile(req.params.id, req.body.name, req.body.email, req.body.phoneNumber, req.body.gender)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_24 = _a.sent();
                res.status(500);
                res.json(error_24);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Update user's password
var updatePassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_25;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.updatePassword(req.params.id, req.body.password)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_25 = _a.sent();
                res.status(500);
                res.json(error_25);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Add an insurance card for a user
var addInsuranceCard = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_26;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.addInsuranceCard(req.params.id, req.body.insuranceCard)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_26 = _a.sent();
                res.status(500);
                res.json(error_26);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Get all insurance cards for a user
var getInsuranceCards = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, error_27;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, userServicesModel.getInsuranceCards(req.params.id)];
            case 1:
                result = _a.sent();
                res.json(result);
                return [3 /*break*/, 3];
            case 2:
                error_27 = _a.sent();
                res.status(500);
                res.json(error_27);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// UserServices routes
var userServices_routes = function (app) {
    app.post('/users/verify', verify);
    app.patch('/users/:id/address', addAddress);
    app.patch('/users/:id/phone', addPhoneNumber);
    app.patch('/users/:id/age', addAge);
    app.patch('/users/:id/gender', addGender);
    app.get('/users/:id/orderHistory', getOrderHistory);
    app.patch('/users/:id/orderHistory', addOrderHistory);
    app.delete('/users/:id/orderHistory/:orderHistoryId', removeOrderHistory);
    app.get('/users/:id/favorites', getFavorites);
    app.patch('/users/:id/favorites', addFavoriteProduct);
    app.delete('/users/:id/favorites/:productId', removeFavoriteProduct);
    app.get('/users/:id/searchHistory', getSearchHistory);
    app.patch('/users/:id/searchHistory', updateSearchHistory);
    app.delete('/users/:id/searchHistory/:query', removeSearchHistory);
    app.get('/users/:id/alarms', getAlarms);
    app.patch('/users/:id/alarms', addAlarm);
    app.patch('/users/:id/alarms/:alarmId', editAlarm);
    app.delete('/users/:id/alarms/:alarmId', removeAlarm);
    app.get('/users/:id/cart', getCartItems);
    app.patch('/users/:id/cart', addCartItem);
    app.delete('/users/:id/cart/:productId', removeCartItem);
    app.patch('/users/:id/cart/:productId/1', incrementCartItem);
    app.patch('/users/:id/cart/:productId/-1', decrementCartItem);
    app.patch('/users/:id/profile', updateProfile);
    app.patch('/users/:id/password', updatePassword);
    app.patch('/users/:id/insuranceCards', addInsuranceCard);
    app.get('/users/:id/insuranceCards', getInsuranceCards);
};
exports.default = userServices_routes;
