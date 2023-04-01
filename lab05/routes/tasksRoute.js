const express = require('express');
const router = express.Router();
const Tasks = require("../controller/taskController")
const RouteTokenValidator = require("../middleware/validateToken")


// add task
router.post('/', RouteTokenValidator, async (req, res, next) => {
    try{
        var task = await Tasks.add(req)
       res.send("added successfully")
    }catch(err){
        next(err)
    }
})
  
// all taske for loged user 
router.get('/', RouteTokenValidator , async (req, res, next) => {
    try{
        var tasks = await Tasks.get(req)
        res.send(tasks)
    }catch(err){
        next(err)
    }
  
})

router.get('/:id', RouteTokenValidator , async (req, res, next) => {
    try{
        var task = await Tasks.show(req.params.id)
        res.send(task)
    }catch(err){
        next(err)
    }
})



   
router.put('/:id',  RouteTokenValidator ,async (req, res, next) => {
    try{
        var id = req.params.id
        var data = req.body
        var task = await Tasks.update(data,id)
        res.send("updated successfully !")
    }catch(err){
        next(err)
    }
})

router.delete('/:id', RouteTokenValidator ,   async (req, res, next) => {
    try{
        var task = await Tasks.remove(req.params.id)
        res.send("deleted successfully !")
    }catch(err){
        next(err)
    }
})



module.exports = router