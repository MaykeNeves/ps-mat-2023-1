import Joi from 'joi'



const User = Joi.object({
    
    description: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages(new Error('A descrição é obrigatória (entre 2 e 30 caracteres)')),

    
})

export default User