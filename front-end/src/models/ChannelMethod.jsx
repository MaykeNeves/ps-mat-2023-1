import Joi from 'joi'



const ChannelMethod = Joi.object({
    
    description: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages(new Error('A descrição é obrigatória (entre 2 e 30 caracteres)')),

    commission_fee: Joi.number()
    .min(0) //não aceita negativo
    .max(100)
    .required()
    .messages(new Error('A taxa de operação deve ser informada (entre 0 e 100)'))
})

export default ChannelMethod