import Joi from 'joi'



const Tag = Joi.object({
    
    description: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages(new Error('A descrição é obrigatória (entre 2 e 30 caracteres)')),

    color: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages(new Error('A cor é obrigatória (entre 2 e 30 caracteres)')),

    type: Joi.number()
    .min(0) //não aceita negativo
    .max(100)
    .required()
    .messages(new Error('O tipo deve ser informada (entre 0 e 100)'))



    
})

// Permite campos não validados, como id createdAt e updatedAt
.options({allowUnknown: true});

export default Tag