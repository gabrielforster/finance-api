import express from "express"

import { connectToDB } from "./src/database";
import auth from "./src/middlewares/auth"

//routes
import UsersRoutes from "./src/routes/users/users.routes"
import TransactionRoutes from "./src/routes/transactions/transactions.routes"

require('dotenv').config();

const app = express()
app.use(express.json())

connectToDB()

app.use("/users", UsersRoutes)
app.use("/transactions", auth, TransactionRoutes)

export default app