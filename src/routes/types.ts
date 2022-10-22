import express, { Request, Response } from 'express'
const router = express.Router();

import {Types} from '../database/models/types';
import {verifyPermission} from '../auth/verifyPermission';

router.get('/', async(req: Request,res: Response)=> {
    const userId = req.header('userId');
    if(!userId){
        res.status(400).send('Bad request');
        return;
    }
    const user = await verifyPermission(userId as string);
    if(!user){
        res.status(401).send('Unauthorized');
        return;
    }

    try{
        const categories = await Types.find();
        res.status(200).json(categories);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

router.get('/:id', async(req: Request,res: Response) => {
    const userId = req.header('userId');
    if(!userId){
        res.status(400).send('Bad request');
        return;
    }
    const user = await verifyPermission(userId as string);
    if(!user){
        res.status(401).send('Unauthorized');
        return;
    }

    try{
        const type = await Types.findById(req.params.id);
        res.status(200).json(type);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

router.post('/', async(req: Request,res: Response) => {
    const userId = req.header('userId');
    if(!userId){
        res.status(400).send('Bad request');
        return;
    }
    const user = await verifyPermission(userId as string);
    if(!user){
        res.status(401).send('Unauthorized');
        return;
    }

    try{
        const type = new Types({
            name: req.body.name.toLowerCase()
        })
        const newType = await type.save();
        res.status(201).json(newType);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

router.patch('/:id', async(req: Request,res: Response) => {
    const userId = req.header('userId');
    if(!userId){
        res.status(400).send('Bad request');
        return;
    }
    const user = await verifyPermission(userId as string);
    if(!user){
        res.status(401).send('Unauthorized');
        return;
    }

    try{
        const type = await Types.findByIdAndUpdate(req.params.id, {
            name: req.body.name.toLowerCase()
        }, {new: true});
        res.status(200).json(type);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

router.delete('/:id', async(req: Request,res: Response) => {
    const userId = req.header('userId');
    if(!userId){
        res.status(400).send('Bad request');
        return;
    }
    const user = await verifyPermission(userId as string);
    if(!user){
        res.status(401).send('Unauthorized');
        return;
    }

    try{
        const type = await Types.findByIdAndDelete(req.params.id);
        res.status(202).json(type);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

module.exports = router;
