import { model, Schema } from "mongoose"

/**
 * @schema schema for user db
 */
import { IUser } from "./../types/expance"
const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },

  },


  { timestamps: true }
)

export default model<IUser>("User", userSchema)