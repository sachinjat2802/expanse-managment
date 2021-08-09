import { Request, Response } from "express";

//middleware to check auth
const isAuth = (req:Request, res:Response, next:any) => {
    if (req.session.isAuth) {
      next();
    } else {
     // req.session.error = "You have to Login first";
      res.send("login pls,You have to Login first");
    }
  };

  export default isAuth;