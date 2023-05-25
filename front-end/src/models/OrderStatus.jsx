import Joi from 'joi'



const OrderStatus = Joi.object({
    
    sequence: Joi.number()
    .min(1)
    .max(30)
    .required()
    .messages(new Error('A sequencia (entre 2 e 30 caracteres)')),

    description: Joi.string()
    .min(0) //não aceita negativo
    .max(100)
    .required()
    .messages(new Error('A descrição é obrigatoria'))
})

// Permite campos não validados, como id createdAt e updatedAt
.options({allowUnknown: true});

export default OrderStatus