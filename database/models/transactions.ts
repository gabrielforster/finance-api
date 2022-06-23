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
        required: true,
        values: ['withdraw', 'deposit'],
        default: 'withdraw',
    },
    createdAt: {
        type: String,
        required: true,
        default: new Date().toISOString(),
    }
})

module.exports = mongoose.model('Transactions', transactionsSchema);