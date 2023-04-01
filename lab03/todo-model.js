const mongoose = require('mongoose');

// schema
const todoSchema = new mongoose.Schema({
    title: {type: String,required: true,},
    status: {type: String,required: true,},
});


var todo = mongoose.model("Todo", todoSchema);
module.exports  = todo;