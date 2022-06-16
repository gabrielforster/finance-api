import mongoose from 'mongoose';

const transactionsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        values: ['withdraw', 'deposit'],
        default: 'withdraw',
    },
    createdAt: {
        type: String,
        default: new Date().toISOString(),
    }
})

module.exports = mongoose.model('Transactions', transactionsSchema);