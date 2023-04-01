const express = require('express');
const app = express()
const port = 8000

app.use(express.json());
require('./DB.js')

const Todo = require("./todo-model")

app.use((err,req, res, next) => {
    console.log(err.stack)
    res.status(500).send("error happen");
})


// add task
app.post('/todos',  async (req, res, next) => {
    try{
        var data = req.body
        var todo = new Todo ({
            title : data.task,
            status : data.status
        })
       await todo.save()
       res.send("added successfully")
    }catch(err){
        next(err)
    }
})
  
// all taske 
app.get('/todos',  async (req, res, next) => {

    try{
        var query = {}
        if (req.query.status){query=req.query.status}
        var todo = await Todo.find({status:query});
        res.send(todo)
    }catch(err){
        next(err)
    }
  
})

app.get('/todos/:id',  async (req, res, next) => {
    try{
        var todo = await Todo.findById(req.params.id);
        res.send(todo)
    }catch(err){
        next(err)
    }
})



   
app.put('/todos/:id',  async (req, res, next) => {
    try{
        var data = req.body
        var todo = await Todo.findByIdAndUpdate(req.params.id ,data );
        res.send("updated successfully !")
    }catch(err){
        next(err)
    }
})

app.delete('/todos/:id',  async (req, res, next) => {
    try{
        var todo = await Todo.findByIdAndRemove(req.params.id);
        res.send("deleted successfully !")
    }catch(err){
        next(err)
    }
})



app.listen(port, () => {
    console.log(`app listening on port ${port} done `)
})