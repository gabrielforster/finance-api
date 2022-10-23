import { Router } from "express"

import * as TransactionsHandler from "./transactions.handler"

const router = Router()

router.get("/", TransactionsHandler.findAll)
router.get("/:id", TransactionsHandler.findOne)
router.post("/", TransactionsHandler.create)
router.patch("/:id", TransactionsHandler.update)
router.delete("/:id", TransactionsHandler.remove)

export default router