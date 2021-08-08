"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth = (req, res, next) => {
    if (req.session.auth) {
        next();
    }
    else {
        req.session.error = "You have to Login first";
    }
};
exports.default = auth;
