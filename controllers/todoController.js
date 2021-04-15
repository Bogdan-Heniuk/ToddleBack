const Todo = require('../model/Todo')

class TodoController {
    async get(req, res) {
        const todos = await Todo.find({
            user_id: req.token._id
        })
        res.json(todos)
    };

    async create(req, res) {
        const todo = new Todo({
            title: req.body.title,
            user_id: req.token._id
        })
        await todo.save()
        res.sendStatus(200)
    }

    async delete(req, res) {
        const result = await Todo.deleteOne({
            _id: req.params.id,
            user_id: req.token._id
        })
        res.send(result)
    }

    async update(req, res) {
        const result = await Todo.updateOne({
            _id: req.params.id,
            user_id: req.token._id
        }, req.body)

        res.send(result)
    }
}

module.exports = new TodoController()