import { Response, Request } from "express"
import { IExpance } from "../../types/expance"
import Expance from "../../models/expance"

//get expance with filters
/**
 * @method getExpance: shows expance 
 * @body req :(name,amount)(limit)(skip)(sortBy.orderBy)
 * @body res :(Expances json)
 * @status code (responce code)
 */
const getExpance = async (req: Request, res: Response): Promise<void> => {
  const query = req.query
  const match: any = {};
  const sort: any = {};
  let { sortBy, orderBy, ...clauses } = req.query
  const limit = req.query.limit as unknown as number
  const skip = req.query.skip as unknown as number

  if (query.name) {
    match.name = query.name
  }
  if (query.amount) {
    match.amount = query.amount
  }
  if (sortBy && orderBy) {
    sort[sortBy.toString()] = orderBy === 'desc' ? -1 : 1
  }
  try {
    const expances: IExpance[] = await Expance.find(match).limit(limit * 1).skip(skip * 1).sort(sort)
    res.status(200).json({ expances })
  }
  catch (error) {
    throw error
  }
}

// add expance
/**
 * @method addExpance :used to add expance
 * @body req : name, amount
 * @body res :status 200 and msg :expance andded and expance data
 */
const addExpance = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IExpance, "name" | "amount">

    const expance: IExpance = new Expance({
      name: body.name,
      amount: body.amount
    })

    const newExpance: IExpance = await expance.save()

    res
      .status(201)
      .json({ message: "Expance added", expance: newExpance })
  } catch (error) {
    throw error
  }
}

// update expance
/**
 * @method : updateExpance  update expance
 * @param req :id
 * @body req : name and amount
 * @body res : message:Expance updated  and updated expance
 * 
 */
const updateExpance = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req
    const updateExpance: IExpance | null = await Expance.findByIdAndUpdate(
      { _id: id },
      body, { new: true }
    )

    res.status(200).json({
      message: "Expance updated",
      expance: updateExpance,

    })
  } catch (error) {
    throw error
  }
}

//delete Expance
/**
 * @Method
 * @param req id
 * @body res message:Expance deleted and shows deletedExpance
 */
const deleteExpance = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedExpance: IExpance | null = await Expance.findByIdAndRemove(
      req.params.id
    )

    res.status(200).json({
      message: "Expance deleted",
      expance: deletedExpance,

    })
  } catch (error) {
    throw error
  }
}

export { getExpance, addExpance, updateExpance, deleteExpance }