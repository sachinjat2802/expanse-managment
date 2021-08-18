import { Router, Request, Response } from "express"
import { getExpance, addExpance, updateExpance, deleteExpance } from "../controllers/expance"
import { getLogin, postLogin, signup, getlogout } from "../controllers/user"
import isAuth from "../middleware/is-auth"
import { uploadMiddleware } from '../controllers/middleware';
import uploadFiles from "../controllers/uploadFiles";


const router: Router = Router()

router.get('/', function (req: Request, res: Response, next) { console.log("serverless") });

//show all expance
/**
 * @use show expance
 * @route /expance use as url  path
 * @middleware isAuth 
 * @method getExpance from expance controller
 */
router.get("/expance", isAuth, getExpance)

// add expance
/**
 * @use add expance
 * @route /addexpance use as url path
 * @middleware isAuth 
 * @method addExpance from expance controller
 */
router.post("/addexpance", isAuth, addExpance)

// update expance
/**
 * @use edit and update expance
 * @route /edit-expance/:id use as url path
 * @route accepting parms as id
 * @middleware isAuth 
 * @method updateExpance from expance controller
 */
router.put("/edit-expance/:id", isAuth, updateExpance)

//delete Expance
/**
 * @use delete expance
 * @route /delete-expance/:id use as url path
 * @route accepting parms as id
 * @middleware isAuth 
 * @method deleteExpance from expance controller
 */

router.delete("/delete-expance/:id", isAuth, deleteExpance)


//login status
/** 
 * @use login status
 * @route /login use as url path
 * @middleware isAuth 
 * @method getLogin from expance controller
 */

router.get("/login", isAuth, getLogin)

//login user
/** 
 * @use login user
 * @route /login use as url path
 * @middleware isAuth 
 * @method postLogin from expance controller
 */
router.post("/login", postLogin)


//create user
/** 
 * @use create user
 * @route /signup use as url path
 * @middleware isAuth 
 * @method signup from expance controller
 */
router.post("/signup", signup)

//logout user
/** 
 * @use logout user
 * @route /logoutuse as url path
 * @middleware isAuth 
 * @method getlogout from expance controller
 */

router.get("/logout", isAuth, getlogout)


router.post('/upload', isAuth, uploadMiddleware.single('input'), uploadFiles);













export default router