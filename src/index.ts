import express, { Express } from 'express';
import cors from 'cors';


//import routes 
const transactionsRouter = require('./routes/transactions');
const categoriesRouter = require('./routes/categories');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const typesRouter = require('./routes/types');


const dotenv = require('dotenv');
dotenv.config();

import { connectToDB } from './database';
const app: Express = express();
const port = process.env.PORT || 8080;

connectToDB()

app.use(express.json())
app.use(cors());


//use routes
app.use('/transactions', transactionsRouter);
app.use('/categories', categoriesRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/types', typesRouter);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});