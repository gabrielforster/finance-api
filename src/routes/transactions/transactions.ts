import express, {Request, Response, Express, NextFunction} from 'express'
const router = express.Router();

const Transactions = require('../../../database/models/transactions');

interface TransactionInterface extends Response {
    transaction?: {
        name: string,
        amount: number,
        type: string,
        createdAt: string
    } | any
}

//Get all
router.get('/', async(req: Request, res: Response) => {
    try{
        const transactions = await Transactions.find();
        res.status(200).json(transactions);
    } catch(err){
        res.status(500).json({message: err.message});
    }
})
//Get one
router.get('/:id', getTransaction, (req: Request, res: TransactionInterface) => {
    res.json(res.transaction);
})
//Create
router.post('/', async(req: Request, res: Response) => {
    const transaction = new Transactions({
        name: req.body.name,
        amount: req.body.amount * 100,
        type: req.body.type,
        createdAt: new Date().toISOString()
    })
    try{
        const newTransaction = await transaction.save();
        return res.status(201).json(newTransaction);
    }catch (err){
        return res.status(400).json({message: err.message});
    }
})
//Update
router.patch('/:id', getTransaction, async(req: Request, res: TransactionInterface) => {
    if(req.body.name){
        res.transaction.name = req.body.name
    }
    if(req.body.amount){
        res.transaction.amount = req.body.amount * 100
    }
    if(req.body.type){
        res.transaction.type = req.body.type
    }

    try{
        const updatedTransaction = await res.transaction.save();
        res.status(202).json(updatedTransaction);
    } catch(err){
        res.status(400).json({message: err.message});
    }
})
//Delete
router.delete('/:id', getTransaction, async(req: Request, res: TransactionInterface) => {
    try{
        await res.transaction.remove();
        res.json({message: 'Transaction deleted'});
    } catch (err){
        res.status(500).json({message: err.message});
    }
})

async function getTransaction(req: Request,res: TransactionInterface, next: NextFunction){
    let transaction;
    try{
        transaction = await Transactions.findById(req.params.id);
        if(!transaction){
            return res.status(400).json({message: 'Transaction not found'});
        }
    } catch(err){
        return res.status(500).json({message: err.message});
    }

    res.transaction = transaction;
    next();
}

module.exports = router;