import mongoose from "mongoose";

const transactionsSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  amount: { type: Number, required: true },
  user: { type: String, required: true },
  category: { type: String, required: false },
  createdAt: {
    type: String,
    required: false,
    default: new Date().toISOString()
  },
  type: {
    type: String,
    required: false,
    values: ['withdraw', 'deposit'],
    default: 'withdraw',
  }
})

export const Transactions = mongoose.model('Transactions', transactionsSchema);