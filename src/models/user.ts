import { model, Schema } from "mongoose"

import { IUser } from "./../types/expance"
const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

   email : {
      type:String,
      required: true,
    },
    password:{
        type:String,
        requird:true,
    },
    phone : {
        type:Number,
        required: true,
      },

    },
 

  { timestamps: true }
)




export default model<IUser>("User", userSchema)