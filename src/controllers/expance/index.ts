import { Response, Request } from "express"
import { IExpance } from "../../types/expance"
import Expance from "../../models/expance"

//show all expance
const getExpanceall = async (req: Request, res: Response): Promise<void> => {
  try {
    const limit = req.query.limit as unknown as number
      const page = req.query.page as unknown as number
    const expances: IExpance[] = await Expance.find().limit(limit*1).skip((page-1)*limit).sort({'amount':-1}).exec();
    res.status(200).json({ expances})
  } catch (error) {
    throw error
  }
}
//get expance with filters
const getExpance = async (req: Request, res: Response): Promise<void> => {

  const match:any= {};
 if(req.query.name){
    match.name = req.query.name 
  }
 else if(req.query.amount){
    match.amount = req.query.amount 
  }
 
  try {
   const expances: IExpance[] = await Expance.find({
    $or: [
      
      { name:match.name},
      { amount:match.amount},

       ]

  }).sort({'amount':-1})
res.status(200).json({expances})
  }
 catch (error) {
    throw error
  }
}

// add expance
const addExpance = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as Pick < IExpance, "name" | "amount" >
  
      const expance: IExpance = new Expance({
        name: body.name,
        amount:body.amount
       
       
        
      })
  
      const newExpance: IExpance = await expance.save()
      const allExpances: IExpance[] = await Expance.find()
  
      res
        .status(201)
        .json({ message: "Expance added", expance: newExpance, expancess: allExpances})
    } catch (error) {
      throw error
    }
}

// update expance
const updateExpance = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req
      const updateExpance: IExpance | null = await Expance.findByIdAndUpdate(
        { _id: id },
        body, {new:true}
      )
      const allExpances: IExpance[] = await Expance.find()
      res.status(200).json({
        message: "Expance updated",
        expance: updateExpance,
        expances: allExpances,
      })
    } catch (error) {
      throw error
    }
  }

  //delete Expance
  const deleteExpance = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedExpance: IExpance | null = await Expance.findByIdAndRemove(
        req.params.id
      )
      const allExpance: IExpance[] = await Expance.find()
      res.status(200).json({
        message: "Expance deleted",
        expance: deletedExpance,
        expances: allExpance,
      })
    } catch (error) {
      throw error
    }
  }
  
  export {getExpanceall ,getExpance, addExpance, updateExpance, deleteExpance }