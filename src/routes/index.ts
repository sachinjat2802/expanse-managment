import { Router } from "express"
import { getExpance, addExpance, updateExpance, deleteExpance, getExpanceall } from "../controllers/expance"

const router: Router = Router()

router.get("/expance", getExpance)

router.get("/expanceall", getExpanceall)

router.post("/addexpance", addExpance)

router.put("/edit-expance/:id", updateExpance)

router.delete("/delete-expance/:id", deleteExpance)

export default router