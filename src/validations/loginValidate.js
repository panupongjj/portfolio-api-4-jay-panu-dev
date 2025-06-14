const Joi = require("joi");


// LOGIN VALIDATION

const userSchema = Joi.object({
   email: Joi.string().min(5).max(255).required().email(),
   password: Joi.string().min(5).max(255).required(),
});




const validateLogin = (req,res,next) =>{
  
    const {error} = userSchema.validate(req.body);
     
    if (error){
        return res.status(400).send({error: error.details[0].message});
    }
   
    next();
    
}

module.exports = validateLogin;