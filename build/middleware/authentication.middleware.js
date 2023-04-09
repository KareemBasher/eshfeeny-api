"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../config"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware for verifying tokens
var validateTokenMiddleware = function (req, res, next) {
    try {
        var authHeader = req.get('Authorization');
        var token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, config_1.default.signiture);
        next();
    }
    catch (error) {
        res.status(401);
        throw new Error("Failed to validate token, ".concat(error));
    }
};
exports.default = validateTokenMiddleware;
