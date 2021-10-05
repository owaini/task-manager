const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = new mongoose.Schema({

       title: {
        type: String,
         required: true,
        
    }, 
    content: {
        type: String, 
        minLength: 10,
        maxLength: 400
    },
     complete: {
        type: Boolean,
        default: false
    },
    owner: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'User'
    }
},
    {
        timestamps: true
    })

const Task = mongoose.model('Task',taskSchema)


module.exports = Task