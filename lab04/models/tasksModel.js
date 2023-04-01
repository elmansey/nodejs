const mongoose = require('mongoose');

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
});


var Tasks = mongoose.model("Tasks", tasksSchema);
module.exports  = Tasks;