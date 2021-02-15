const app = module.exports = require('express')()
const Todo = require("../../model/Todo")
const jwtValidation = require('../../middlwares/jwtValidation')

app.get('/todos', jwtValidation, async (req, res) => {
    const todos = await Todo.find({
        user_id : req.token._id
    })
    res.json(todos)
});

app.post('/todos', jwtValidation,async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        user_id : req.token._id
    })
    await todo.save()
    res.sendStatus(200)
})

app.delete('/todos/:id', jwtValidation,async (req, res) => {
        const result = await Todo.deleteOne({
            _id : req.params.id,
            user_id : req.token._id
        })
        res.send(result)
})

app.patch('/todos/:id', jwtValidation, async (req, res) => {
        const result = await Todo.updateOne({
            _id : req.params.id,
            user_id : req.token._id
        }, req.body)

        res.send(result)
})