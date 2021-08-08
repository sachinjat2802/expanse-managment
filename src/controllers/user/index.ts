import { Response, Request } from "express"
import { IUser } from "../../types/expance"
import User from "../../models/user"
import bcrypt from "bcryptjs"

const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const body = req.body as Pick < IUser, "name" | "email"|"password"|"phone">

        const Ps = req.body.password as unknown as string


        const hash= await bcrypt.hash(Ps, 12);

        const user: IUser = new User({
          name: body.name,
          email:body.email,
          password:hash,
          phone:body.phone,
          })
         const newuser = await User.findOne({ name:body.name });
         if (newuser) {
           res.send( "Username already exists")
        }
        const newUser: IUser = await user.save()
        res
          .status(201)
          .json({ message: "user created", user: newUser})
      } catch (error) {
        throw error
      }
    }

const getLogin = async (req: Request, res: Response): Promise<void> => {

    const error = req.session.error;
    delete req.session.error;
    res.send("logged in")
}
const postLogin = async (req: Request, res: Response): Promise<void> => {
   try {
    const body = req.body as Pick < IUser, "name" | "password">

    const user = await User.findOne({name:body.name});

    if (!user) {
        
        req.session.error ="Invalid Credentials";
        res.send("Invalid Credentials");
       }
       

       const isMatch = await bcrypt.compare(body.password as unknown as string, user?.password as string);

       if (!isMatch) {
        req.session.error ="Invalid Credentials";
        res.send("Invalid Credentials");
      }

       req.session.isAuth=true;
       req.session.name = body.name;

       res.send("login successfull");
    



      
      


    } catch (error) {
        throw error
      }
    }



const getlogout  = async (req: Request, res: Response): Promise<void> => {
    req.session.destroy((err) => {
     
        if (err) throw err;
        res.send("successfull logout")
       res.clearCookie('connect.sid',  { path: '/' })
      
      });
}


















export{getLogin,postLogin,signup,getlogout}




