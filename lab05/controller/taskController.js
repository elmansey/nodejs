const Tasks = require("../models/tasksModel")




async function add(req){
    var Task = new Tasks ({
        title : req.body.title,
        status : req.body.status,
        user: req.user._id
    })
   await Task.save()
   return Task
}
async function get(req){
    var tasks = await Tasks.find({user:req.user._id});
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



//ali
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTA5Y2QxNDkwM2MwNGFhM2M5M2NjMiIsImlhdCI6MTY3ODgxMDMyNywiZXhwIjoxNjc4ODEzOTI3fQ.Pq2oa6yxa-xiGXQjlrtpSZxYbGuWEcj_fqYT-tPAqdg 



//abdelrahman
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTA5Y2M1NDkwM2MwNGFhM2M5M2NjMCIsImlhdCI6MTY3ODgxMDM1MywiZXhwIjoxNjc4ODEzOTUzfQ.QtSPsiTTFI_LHQTUtxn_0CIMMJ7Jm7ruporfKCMVB6E