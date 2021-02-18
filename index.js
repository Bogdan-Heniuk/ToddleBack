require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.PORT || 80
const todosRoutes = require('./routes/todo/routes')
const usersRoutes = require('./routes/user/routes')

async function start() {
    try {
        await mongoose.connect('mongodb+srv://loh:loh20022002@cluster0.r98eg.mongodb.net/Toodle?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
    } catch (e) {
        console.log(e)
    }
}

start()

const app = express()
app.use(express.json())
app.use(cors())
app.use(todosRoutes)
app.use(usersRoutes)
app.listen(PORT)

