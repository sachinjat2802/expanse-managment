import { Router,Request,Response } from "express"
import { getExpance, addExpance, updateExpance, deleteExpance, getExpanceall } from "../controllers/expance"
import {getLogin,postLogin,signup,getlogout}from"../controllers/user"
import isAuth from "../middleware/is-auth"

const router: Router = Router()

//show all expance
router.get("/expance",isAuth, getExpance)

//get expance with filters
router.get("/expanceall",isAuth, getExpanceall)

// add expance
router.post("/addexpance",isAuth, addExpance)

// update expance
router.put("/edit-expance/:id",isAuth, updateExpance)

//delete Expance
router.delete("/delete-expance/:id",isAuth, deleteExpance)


//login status
router.get("/login",isAuth, getLogin)

//login user
router.post("/login", postLogin)


//create user
router.post("/signup",signup)

//logout user
router.get("/logout",isAuth, getlogout)













export default router