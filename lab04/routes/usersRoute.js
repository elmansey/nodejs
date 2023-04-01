const express = require('express');
const router = express.Router();
const Users = require("../controller/userController")
var bcrypt = require('bcryptjs');
var validator = require('../middleware/validator');



// login 
router.post('/login', validator.loginValidator, async (req, res, next) => {
    try{
        var data = req.body
        var response = await Users.login(data,next)
        res.send(response)
    }catch(err){
        next(err)
    }
})


// add users => register 
router.post('/', validator.RegisterValidator, async (req, res, next) => {
    try{
        var data = req.body
        var response = await Users.register(data)
       res.send(response)
    }catch(err){
        next(err)
    }
})
  
// all users 
router.get('/',  async (req, res, next) => {
    try{
        var response = await Users.get()
        res.send(response)
    }catch(err){
        next(err)
    }
})

// get user by id 
router.get('/:id',  async (req, res, next) => {
    try{
        var id = req.params.id
        var response = await Users.show(id)
        res.send(response)
    }catch(err){
        next(err)
    }
})

// update user
router.put('/:id',  async (req, res, next) => {
    try{
        var id = req.params.id
        var data = req.body
        var response = await Users.update(id,data)
        res.send("updated successfully !")
    }catch(err){
        next(err)
    }
})

// delete user
router.delete('/:id',  async (req, res, next) => {
    try{
        var id = req.params.id
        var response = await Users.remove(id)
        res.send("deleted successfully !")
    }catch(err){
        next(err)
    }
})



module.exports = router



