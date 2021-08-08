import { Router,Request,Response } from "express"
import { getExpance, addExpance, updateExpance, deleteExpance, getExpanceall } from "../controllers/expance"
import {getLogin,postLogin,signup,getlogout}from"../controllers/user"
import isAuth from "../middleware/is-auth"

const router: Router = Router()



router.get("/expance",isAuth, getExpance)

router.get("/expanceall",isAuth, getExpanceall)

router.post("/addexpance",isAuth, addExpance)

router.put("/edit-expance/:id",isAuth, updateExpance)

router.delete("/delete-expance/:id",isAuth, deleteExpance)


router.get("/login",isAuth, getLogin)

router.post("/login", postLogin)



router.post("/signup",signup)

router.get("/logout",isAuth, getlogout)













export default router