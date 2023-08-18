const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email:{
        type: string,
        required: true,
        lowercase : true,
        unique : true
    },
    password:{
        type: string,
        required:true
    }

})

const User = mongoose.model('user',UserSchema)

module.exports = User