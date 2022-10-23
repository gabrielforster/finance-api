import { Request, Response, NextFunction } from "express";
import { Transactions } from "./transactions.model"

export async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const transactions = await Transactions.find({ user: req.user.user_id })
    res.status(200).json(transactions)
  } catch (error) {
    next(error)
  }
}

export async function findOne(req: Request, res: Response, next: NextFunction) {
  try {
    const transaction = await Transactions.findOne({ _id: req.params.id, user: req.user.user_id })
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" })
    }
    res.status(200).json(transaction)
  } catch (error) {
    next(error)
  }
}

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const transaction = await Transactions.create({ ...req.body, user: req.user.user_id })
    res.status(201).json(transaction)
  } catch (error) {
    next(error)
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const transaction = await Transactions.findOneAndUpdate({ _id: req.params.id, user: req.user.user_id }, req.body, { new: true })
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" })
    }
    res.status(200).json(transaction)
  } catch (error) {
    next(error)
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const transaction = await Transactions.findOneAndDelete({ _id: req.params.id, user: req.user.user_id }, )
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" })
    }
    res.status(200).json({ message: "Transaction deleted" })
  } catch (error) {
    next(error)
  }
}