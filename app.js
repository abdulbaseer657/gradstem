const express = require('express')
const morgan = require('morgan')
const CreateError = require('http-errors')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')
const AuthRoute = require('./Routes/Auth.route')
const app = express()
app.use(morgan('dev'))

app.get('/', async(req,res,next)=>{
    res.send('Hello from gradjobs')
})

app.use('/auth', AuthRoute)

app.use(async(req,res,next)=>{
    next(createError.NotFound())
})


app.use(async(err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status:err.status||500,
            message: err.message,
        },
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})

 