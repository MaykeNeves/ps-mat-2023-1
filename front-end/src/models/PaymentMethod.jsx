import Joi from 'joi'



const PaymentMethod = Joi.object({
    
    description: Joi.string()
    .min(2)
    .max(30)
    .required()
    .error(new Error('A descrição é obrigatória (entre 2 e 30 caracteres)')),

    operator_fee: Joi.number()
    .min(0) //nbão aceita negativo
    .max(100)
    .required()
    .error(new Error('A taxa de operação deve ser informada (entre 0 e 100)'))
})

export default PaymentMethod