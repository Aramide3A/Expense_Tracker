const mongoose = require('mongoose')

const schema = mongoose.Schema({
    full_name: {
        type: String,
        required : true,
    },
    email: {
        type: String,
        required : true,
    },
    password: {
        type: String,
        required : true,
    },
})

const Users = mongoose.model('User', schema)

module.exports = Users