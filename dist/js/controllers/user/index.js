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
/**
 * @method signup :create users
 * @body req : name email password phone
 * @hash password :hash password with bcrypt
 * @constructor User create new user
 * @returns res body : if user already exists if we find user with findone moongose method
 * @save save the user in db
 * @status res: 201
 * @body res json: user created new user data
 */
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const Ps = req.body.password;
        // hash password
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
            return;
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
/**
 * @method getLogin :show login status
 * @body res:user Login
 */
const getLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("logged in");
    console.log("loggin funtion");
});
exports.getLogin = getLogin;
//login user
/**
 * @method postLogin : main login method to login user
 * @body req :name password
 * @checkuser with findone method and filter it with username(name)
 * @body res: "user name invalid if we user with that name not exist in our db
 * @comperepassword if name exist than compere password with our bcrypt compere method
 * @password not match than
 * @body res:invalid password
 * @password match than make than
 * @session req isAuth to true   req session name to body name
 * @body res:login successfull
 */
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = yield user_1.default.findOne({ name: body.name });
        if (!user) {
            // req.session.error ="Invalid Credentials";
            res.send("user name is invalid");
        }
        // compere password
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
/**
 * @method getlogout: logout user
 * @session req destroy session method delete session
 * @error if error throw error
 * @body res: successfull logout
 * @clearcookie delete session cookie with having name connect.sid and its with path '/'
 */
const getlogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session.destroy((err) => {
        if (err)
            throw err;
        res.send("successfull logout");
        res.clearCookie('connect.sid', { path: '/' });
    });
});
exports.getlogout = getlogout;
