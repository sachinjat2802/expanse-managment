import { Response, Request } from "express"
import { IExpance } from "./../../types/expance"
import Expance from "../../models/expance"

const getExpance = async (req: Request, res: Response): Promise<void> => {
  try {
    const expances: IExpance[] = await Expance.find()
    res.status(200).json({ expances})
  } catch (error) {
    throw error
  }
}
const addExpance = async (req: Request, res: Response): Promise<void> => {
    try {
      const body = req.body as Pick < IExpance, "name" | "amount" >
  
      const expance: IExpance = new Expance({
        name: body.name,
       amount: body.amount,
        
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
const updateExpance = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req
      const updateExpance: IExpance | null = await Expance.findByIdAndUpdate(
        { _id: id },
        body
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
  
  export { getExpance, addExpance, updateExpance, deleteExpance }