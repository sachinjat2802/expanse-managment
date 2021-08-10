"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expance_1 = require("../controllers/expance");
const user_1 = require("../controllers/user");
const is_auth_1 = __importDefault(require("../middleware/is-auth"));
const router = express_1.Router();
//show all expance
/**
 * @use show expance
 * @route /expance use as url  path
 * @middleware isAuth
 * @method getExpance from expance controller
 */
router.get("/expance", is_auth_1.default, expance_1.getExpance);
// add expance
/**
 * @use add expance
 * @route /addexpance use as url path
 * @middleware isAuth
 * @method addExpance from expance controller
 */
router.post("/addexpance", is_auth_1.default, expance_1.addExpance);
// update expance
/**
 * @use edit and update expance
 * @route /edit-expance/:id use as url path
 * @route accepting parms as id
 * @middleware isAuth
 * @method updateExpance from expance controller
 */
router.put("/edit-expance/:id", is_auth_1.default, expance_1.updateExpance);
//delete Expance
/**
 * @use delete expance
 * @route /delete-expance/:id use as url path
 * @route accepting parms as id
 * @middleware isAuth
 * @method deleteExpance from expance controller
 */
router.delete("/delete-expance/:id", is_auth_1.default, expance_1.deleteExpance);
//login status
/**
 * @use login status
 * @route /login use as url path
 * @middleware isAuth
 * @method getLogin from expance controller
 */
router.get("/login", is_auth_1.default, user_1.getLogin);
//login user
/**
 * @use login user
 * @route /login use as url path
 * @middleware isAuth
 * @method postLogin from expance controller
 */
router.post("/login", user_1.postLogin);
//create user
/**
 * @use create user
 * @route /signup use as url path
 * @middleware isAuth
 * @method signup from expance controller
 */
router.post("/signup", user_1.signup);
//logout user
/**
 * @use logout user
 * @route /logoutuse as url path
 * @middleware isAuth
 * @method getlogout from expance controller
 */
router.get("/logout", is_auth_1.default, user_1.getlogout);
exports.default = router;
