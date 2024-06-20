const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../models/user.model')
require('dotenv').config()

router.post('/register', async(req, res)=>{
    try {
        const hashedpassword = await bcrypt.hash(req.body.password, 10) 
        const user = new User({
            email: req.body.email,
            full_name: req.body.full_name,
            password: hashedpassword 
        })
        await user.save()
        const payload = {_id: user._id ,email : user.email}
        const token = jwt.sign(payload, process.env.SECRET_KEY)
        res.send(token)
    } catch (error) {
        res.send(error)
    }
})

router.post('/login', async(req,res)=>{
    const user = await User.findOne({email : req.body.email})
    if (bcrypt.compare(req.body.password, user.password)){
        const payload = {_id: user._id ,email : user.email}
        const token = jwt.sign(payload, process.env.SECRET_KEY)
        res.send(token)
    }
    else {
        res.send('Invalid Login parameter')
    }
})

module.exports = router;