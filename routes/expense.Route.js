const express = require('express')
const router = express.Router()
const Users = require('../models/user.model')
const Expenses = require('../models/expense.model')
const authenticateToken = require('../middleware/authToken')


// Route to get all expenses
router.get('/',authenticateToken, async(req, res)=>{
    const expense = await Expenses.find({})
    res.send(expense)
})

// Route to add new expenses
router.post('/',authenticateToken, async(req, res)=>{
    const {name, amount, date, category} = req.body
    try {
        const newExpense = new Expenses({
            user : req.user._id,
            name,
            amount,
            date,
            category
        })
        await newExpense.save()
        res.send(newExpense).status(201)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
})

//Route to update expenses 
router.put('/:id',authenticateToken, async(req, res)=>{
    try {
        const expense = await Expenses.findByIdAndUpdate({_id : req.params.id}, req.body, {new : true})
        if (!expense) {
            return res.status(404).send('Expense Does Not Exist')
        }
        res.send(expense).status(201)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
})

//Route to delete expense 
router.delete('/:id',authenticateToken, async(req, res)=>{
    try {
        const expense = await Expenses.findByIdAndDelete({_id : req.params.id})
        if (!expense) {
            return res.status(404).send('Expense Does Not Exist')
        }
        res.send("deleted successfully").status(201)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error')
    }
})


module.exports = router