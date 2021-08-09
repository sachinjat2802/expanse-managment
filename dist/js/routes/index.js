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
router.get("/expance", is_auth_1.default, expance_1.getExpance);
//get expance with filters
router.get("/expanceall", is_auth_1.default, expance_1.getExpanceall);
// add expance
router.post("/addexpance", is_auth_1.default, expance_1.addExpance);
// update expance
router.put("/edit-expance/:id", is_auth_1.default, expance_1.updateExpance);
//delete Expance
router.delete("/delete-expance/:id", is_auth_1.default, expance_1.deleteExpance);
//login status
router.get("/login", is_auth_1.default, user_1.getLogin);
//login user
router.post("/login", user_1.postLogin);
//create user
router.post("/signup", user_1.signup);
//logout user
router.get("/logout", is_auth_1.default, user_1.getlogout);
exports.default = router;
