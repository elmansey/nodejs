const Users = require("../models/userModel")
var jwt = require("jsonwebtoken")


// login 
async function login(data,next){
    var {username,password} = data

    var user = await Users.findOne({username}).select("+password")
    if (!user)
    {
        const error = new Error("error in username or password") 
        error.statusCode = 400
        return next(error)
    }
    var checkPassword = await user.comparePassword(password);
    if (!checkPassword)
    {
        const error = new Error("error in username or password") 
        error.statusCode = 400
        return next(error)
    }

    // if name and password true generate token for this user 
    const payload = {id:user._id}
    const token = jwt.sign(payload,process.env.JWTSECRET,{expiresIn:'1h'})

    var response = {
        message:"logged successfully",
        token,
        user
    }

    return response
}

// register 
async function register(data){
    var {username,email,password} = data
    var user = new Users ({
        username ,
        email ,
        password
    })
   await user.save()
   return user
}
async function add(data){

}
// all users 
async function get(){
    var users = await Users.find();
    return users
}
async function show(id){
    var user = await Users.findById(id);
    return user
}
async function update(id,data){
    var user = await Users.findOneAndUpdate(id,data );
    return user
}
async function remove(id){
    var user = await Users.findByIdAndRemove(id);
    return user
}


module.exports = {login,register,add,get,show,update,remove}