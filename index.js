const express = require('express')
const app = express()
const mongoose = require('mongoose')
const AuthRoute = require('./routes/authRoute')
const expenseRoute = require('./routes/expense.Route')

app.use(express.json())
app.use('/api/auth', AuthRoute)
app.use('/api/expense', expenseRoute)

app.listen(3000, ()=>{
    console.log("Server running on port 3000")
})

mongoose.connect('mongodb://localhost:27017/expense_tracker')
.then(console.log('Db running successfully'))