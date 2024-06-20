const Joi = require('joi')

function ExpenseValidator(expense){
    const Schema = Joi.object({
        user: Joi.string().required(),
        amount: Joi.number().required(),
        category: Joi.string().valid('Groceries', 'Leisure', 'Electronics', 'Utilities', 'Clothing', 'Health', 'Others').required(),
        date: Joi.date().optional(),
    });
    return Schema.validate(expense)
}

module.exports = ExpenseValidator