const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema
const tasksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'the title is required !']
    },
    status: {
        type: String,
        required: [true, 'the status is required !']
    },
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Users'
    }
});


var Tasks = mongoose.model("Tasks", tasksSchema);
module.exports  = Tasks;