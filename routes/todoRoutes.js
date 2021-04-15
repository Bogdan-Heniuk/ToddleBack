const app = module.exports = require('express')()
const jwtValidation = require('../middlwares/jwtValidation')
const todosController = require('../controllers/todoController')

app.get('/todos', jwtValidation, todosController.get)

app.post('/todos', jwtValidation, todosController.create)

app.delete('/todos/:id', jwtValidation, todosController.delete)

app.patch('/todos/:id', jwtValidation, todosController.update)