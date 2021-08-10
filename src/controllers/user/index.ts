import { Response, Request } from "express"
import { IUser } from "../../types/expance"
import User from "../../models/user"
import bcrypt from "bcryptjs"

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
const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, "name" | "email" | "password" | "phone">

    const Ps = req.body.password as unknown as string

    // hash password
    const hash = await bcrypt.hash(Ps, 12);

    const user: IUser = new User({
      name: body.name,
      email: body.email,
      password: hash,
      phone: body.phone,
    })
    const newuser = await User.findOne({ name: body.name });
    if (newuser) {
      res.send("Username already exists")
      return
    }
    const newUser: IUser = await user.save()
    res
      .status(201)
      .json({ message: "user created", user: newUser })
  } catch (error) {
    throw error
  }
}

//login status
/**
 * @method getLogin :show login status
 * @body res:user Login
 */
const getLogin = async (req: Request, res: Response): Promise<void> => {
  res.send("logged in")
}

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
const postLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, "name" | "password">

    const user = await User.findOne({ name: body.name });

    if (!user) {

      // req.session.error ="Invalid Credentials";
      res.send("user name is invalid");
    }

    // compere password
    const isMatch = await bcrypt.compare(body.password as unknown as string, user?.password as string);

    if (!isMatch) {
      //req.session.error ="Invalid Credentials";
      res.send("password is not valid");
    }
    req.session.isAuth = true;
    req.session.name = body.name;

    res.send("login successfull");
  } catch (error) {
    throw error
  }
}

//logout user
/**
 * @method getlogout: logout user
 * @session req destroy session method delete session
 * @error if error throw error
 * @body res: successfull logout
 * @clearcookie delete session cookie with having name connect.sid and its with path '/'
 */
const getlogout = async (req: Request, res: Response): Promise<void> => {
  req.session.destroy((err) => {

    if (err) throw err;
    res.send("successfull logout")
    res.clearCookie('connect.sid', { path: '/' })

  });
}


















export { getLogin, postLogin, signup, getlogout }




