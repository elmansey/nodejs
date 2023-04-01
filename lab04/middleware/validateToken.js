var jwt = require("jsonwebtoken")
const Users = require("../models/userModel")


async function validateToken(req, res, next) {
    const auhorizationHeader = req.headers.authorization;
    let result;
  
    if (!auhorizationHeader) {
      return res.status(401).json({
        error: true,
        message: "Access token is missing",
      });
    }
    
    const token = req.headers.authorization.split(" ")[1];
  
  
    try {
      
      let user = await Users.findOne({
        id: token.id,
      });

      
      if (!user) {
        result = {
          error: true,
          message: "Authorization error",
        };
  
        return res.status(403).json(result);
      }
      result = jwt.verify(token, process.env.JWTSECRET);
        
      if (!result) {
        result = {
          error: true,
          message: "Invalid token",
        };

        return res.status(401).json(result);
      }
        // var user = await Users.findById(result.id)
        // res.send({
        //   token,
        //   user
        // })
      next();
    } catch (error) {
      console.error(error);
      if (error.name === "TokenExpiredError") {
        return res.status(403).json({
          error: true,
          message: "Token expired",
        });
      }
  
      return res.status(403).json({
        error: true,
        message: "Authentication error",
      });
    }
  }
  
  module.exports = validateToken