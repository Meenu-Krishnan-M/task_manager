require('dotenv').config

const express = require('express')

const cors = require('cors')

require('./connection')

const router = require('./router')

const taskServer=express()

taskServer.use(cors())

taskServer.use(express.json())

taskServer.use(router)

const PORT = 4000 || process.env.PORT

taskServer.listen(PORT,()=>{
console.log(`Server running at ${PORT}`);
})
