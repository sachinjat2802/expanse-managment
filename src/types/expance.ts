import { Document } from "mongoose"

export interface IExpance extends Document {
  name: string
  amount: Number
}