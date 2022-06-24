import express, {Request, Response } from 'express'
const router = express.Router();

import {Categories} from '../../database/models/categories';

router.use(express.json())

router.get('/', async(req: Request,res: Response)=> {
    try{
        const categories = await Categories.find();
        res.status(200).json(categories);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

router.get('/:id', async(req: Request,res: Response) => {
    try{
        const category = await Categories.findById(req.params.id);
        res.status(200).json(category);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
})

router.post('/', async(req: Request,res: Response) => {
    try{
      const category = new Categories({
          name: req.body.name
      })
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

router.patch('/:id', async(req: Request,res: Response) => {
    try{
        const category = await Categories.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(202).json(category);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

router.delete('/:id', async(req: Request,res: Response) => {
    try{
        const category = await Categories.findByIdAndDelete(req.params.id);
        res.status(202).json(category);
    }
    catch(err){
        res.status(400).json({message: err.message});
    }
})

module.exports = router;