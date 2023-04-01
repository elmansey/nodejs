var jwt = require("jsonwebtoken")
const Users = require("../models/userModel")
const {promisify} = require('util');
const verifyJwt = promisify(jwt.verify);

async function validateToken(req, res, next) {
    try{
      //  extract token from headers
      const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : "";
      if(!token){
        const error = new Error('unauthorized');
        error.statusCode = 401;
        return next(error)
      }

      const {id} = await verifyJwt(token,process.env.JWTSECRET);
      // find user by id
      const user = await Users.findById(id);
      if(!user){
        const error = new Error('unauthorized');
        error.statusCode = 401;
        return next(error)
      }
      //  attach user to request body
      req.user = user;
      next();	
    }catch(err){
      console.log(err)
      next(err)
    }
  }
  
  module.exports = validateToken