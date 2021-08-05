import { Router } from "express"
import { getExpance, addExpance, updateExpance, deleteExpance } from "../controllers/expance"

const router: Router = Router()

router.get("/expance", getExpance)

router.post("/addexpance", addExpance)

router.put("/edit-expance/:id", updateExpance)

router.delete("/delete-expance/:id", deleteExpance)

export default router