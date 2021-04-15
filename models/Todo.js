const {Schema, model} = require('mongoose')

const schema = new Schema({
    user_id : {
        type: String,
        required : true
    },

    title: {
        type: String,
        required: true

    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = model('Todo', schema)
