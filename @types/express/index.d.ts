// declare session data fields 

import "express-session";


declare module "express-session" {
    interface SessionData {
        isAuth:Boolean|undefined;
        error:String|undefined;
        name:String;
    }
}
declare global {
    namespace Express {
        interface Request {
            isAuth: Boolean|undefined;
            error:String|undefined;
            name:String;
        }
    }
}
