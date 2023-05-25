import Joi from 'joi'



const User = Joi.object({
    
    name: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages(new Error('O nome é obrigatória (entre 2 e 30 caracteres)')),

    email: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages(new Error('O email é obrigatória (entre 2 e 30 caracteres)')),

    password: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages(new Error('A senha é obrigatória (entre 2 e 30 caracteres)')),

    
})

// Permite campos não validados, como id createdAt e updatedAt
.options({allowUnknown: true});


export default User