var joi = require('joi');



// middleware to check required input  manually without joi
const checkRequiredField = (params) => (req,res,next) => {
    const reciveParams = Object.keys(req.body)
    const missingParams = params.filter(param => !reciveParams.includes(param)) 
    if(missingParams.length > 0)
    {
        res.status(400).json({
            status:"error",
            message:`missing params ${missingParams.join(',')}`,
            status:400
        });
        return next()
    }
    return next()
}

// middleware to check required input and make validation with joi package
const loginSchema = joi.object({
    username:joi.string().min(3).max(30).required(),
    password:joi.string().required()
})


const RegisterSchema = joi.object({
    username:joi.string().min(3).max(30).required(),
    email:joi.string().required(),
    password:joi.string().required()
})


const loginValidator = (req,res,next) => {
    const {error} = loginSchema.validate(req.body)
    if(error)
    {
        const err = new Error(error.details[0].message);
        err.statusCode = 400
        return next(err) 
    }
    next()
}

const RegisterValidator = (req,res,next) => {
    const {error} = RegisterSchema.validate(req.body)
    if(error)
    {
        const err = new Error(error.details[0].message);
        err.statusCode = 400
        return next(err) 
    }
    next()
}

module.exports = {
    loginValidator,
    RegisterValidator
}