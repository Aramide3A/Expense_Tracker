const mongoose = require('mongoose')
const User = require('./user.model')

const schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required : true
    },
    name : {
        type: String,
        required : true
    },
    amount: {
        type: Number,
        required : true,
    },
    date: {
        type: Date,
        required : true,
    },
    category: {
        type: String,
        enum: ['Groceries', 'Leisure', 'Electronics', 'Utilities', 'Clothing', 'Health', 'Others'],
        required: true
    }
})

const Expenses = mongoose.model('Expense', schema)

module.exports = Expenses