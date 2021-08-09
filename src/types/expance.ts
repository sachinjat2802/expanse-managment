import { Document } from "mongoose"

export interface IExpance extends Document {
  name: string
  amount:Number
  
}

export interface IUser extends Document {
  name: string
  email:String
  password:String
  phone:Number
  
}


