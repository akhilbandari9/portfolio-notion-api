require('dotenv').config()
const express = require('express')
const cors = require('cors')
const notion = require('./services/notion')
const app = express()
const PORT = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json({ extended: false }))

//routes
app.use('/p', require('./routes'))

//server
app.listen(PORT, () => console.log(`Server running at port ${PORT}`))
