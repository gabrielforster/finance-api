import express, { Express } from 'express';
import cors from 'cors';

const dotenv = require('dotenv');
dotenv.config();

import mongoose from 'mongoose';
mongoose.connect(process.env.DATABASE_URL as string);

const db = mongoose.connection;
db.on('error',(error) => console.error({'error on connection': error.message}));
db.once('open',() => console.log('DB OK!'));

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(express.json())
app.use(cors());

const transactionsRouter = require('./routes/transactions');
app.use('/transactions', transactionsRouter);

const categoriesRouter = require('./routes/categories');
app.use('/categories', categoriesRouter);

const loginRouter = require('./routes/login');
app.use('/login', loginRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const typesRouter = require('./routes/types');
app.use('/types', typesRouter);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});