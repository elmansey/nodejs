const Tasks = require("../models/tasksModel")




async function add(data){
    var Task = new Tasks ({
        title : data.title,
        status : data.status
    })
   await Task.save()
   return Task
}
async function get(){
    var tasks = await Tasks.find();
    return tasks
}
async function show(id){
    var task = await Tasks.findById(id);
    return task
}
async function update(data,id){
    var data = data
    var task = await Tasks.findByIdAndUpdate(id ,data );
    return task
}
async function remove(id){
    var task = await Tasks.findByIdAndRemove(id);
    return task
}

module.exports = {add,get,show,update,remove}