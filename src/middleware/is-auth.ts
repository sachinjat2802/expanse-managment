import { Request, Response } from "express";

//middleware to check auth
/**
 * @middleware method isAuth check the session is login or not 
 * @next if session is login then move forword to next method or middleware 
 * @body res: if session auth is not true it will send boy as "login pls , you have to login first"
 * @export exports isAuth middleware
 */
const isAuth = (req:Request, res:Response, next:any) => {
    if (req.session.isAuth) {
      next();
    } else {
     // req.session.error = "You have to Login first";
      res.send("login pls,You have to Login first");
    }
  };

  export default isAuth;