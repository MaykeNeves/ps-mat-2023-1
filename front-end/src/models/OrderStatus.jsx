import Joi from 'joi'



const OrderStatus = Joi.object({
    
    sequencia: Joi.number()
    .min(2)
    .max(30)
    .required()
    .messages(new Error('A sequencia (entre 2 e 30 caracteres)')),

    description: Joi.string()
    .min(0) //não aceita negativo
    .max(100)
    .required()
    .messages(new Error('A descrição é obrigatoria'))
})

export default OrderStatus