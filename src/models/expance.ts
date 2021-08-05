import { IExpance } from "./../types/expance"
import { model, Schema } from "mongoose"

const expanceSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    amount: {
      type:Number,
      required: true,
    },
 },
  { timestamps: true }
)

export default model<IExpance>("Expance", expanceSchema)