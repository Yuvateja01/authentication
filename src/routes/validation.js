const Joi  =require('@hapi/joi');

const registrationValidate=(info)=>{

const schema=Joi.object().keys({
    name:Joi.string().min(6)
    .required(),
    email:Joi.string().email().required(),
    password:Joi.string().required().min(6)

});
return schema.validate(info);

}
const loginValidate=(info)=>{

    const schema=Joi.object().keys({
        
        email:Joi.string().email().required(),
        password:Joi.string().required().min(6)
    
    });
    return schema.validate(info);
    
    }


    module.exports.registrationValidate=registrationValidate;
    module.exports.loginValidate=loginValidate;