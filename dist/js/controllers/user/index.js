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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getlogout = exports.signup = exports.postLogin = exports.getLogin = void 0;
const user_1 = __importDefault(require("../../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
//create user
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const Ps = req.body.password;
        const hash = yield bcryptjs_1.default.hash(Ps, 12);
        const user = new user_1.default({
            name: body.name,
            email: body.email,
            password: hash,
            phone: body.phone,
        });
        const newuser = yield user_1.default.findOne({ name: body.name });
        if (newuser) {
            res.send("Username already exists");
        }
        const newUser = yield user.save();
        res
            .status(201)
            .json({ message: "user created", user: newUser });
    }
    catch (error) {
        throw error;
    }
});
exports.signup = signup;
//login status
const getLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const error = req.session.error;
    // delete req.session.error;
    res.send("logged in");
});
exports.getLogin = getLogin;
//login user
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = yield user_1.default.findOne({ name: body.name });
        if (!user) {
            // req.session.error ="Invalid Credentials";
            res.send("user name is invalid");
        }
        const isMatch = yield bcryptjs_1.default.compare(body.password, user === null || user === void 0 ? void 0 : user.password);
        if (!isMatch) {
            //req.session.error ="Invalid Credentials";
            res.send("password is not valid");
        }
        req.session.isAuth = true;
        req.session.name = body.name;
        res.send("login successfull");
    }
    catch (error) {
        throw error;
    }
});
exports.postLogin = postLogin;
//logout user
const getlogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy((err) => {
        if (err)
            throw err;
        res.send("successfull logout");
        res.clearCookie('connect.sid', { path: '/' });
    });
});
exports.getlogout = getlogout;
