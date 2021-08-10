import { Document } from "mongoose"
/**
 * @interface IExpance for expance 
 */
export interface IExpance extends Document {
  name: string
  amount:Number
  
}

/**
 * @interface IExpance for expance user
 */

export interface IUser extends Document {
  name: string
  email:String
  password:String
  phone:Number
  
}


