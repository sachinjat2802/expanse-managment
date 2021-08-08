"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    }
    else {
        // req.session.error = "You have to Login first";
        res.send("login pls,You have to Login first");
    }
};
exports.default = isAuth;
