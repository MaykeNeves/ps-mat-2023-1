import Joi from 'joi'



const PaymentMethod = Joi.object({
    
    description: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages(new Error('A descrição é obrigatória (entre 2 e 30 caracteres)')),

    operator_fee: Joi.number()
    .min(0) //não aceita negativo
    .max(100)
    .required()
    .messages(new Error('A taxa de operação deve ser informada (entre 0 e 100)'))
})

// Permite campos não validados, como id createdAt e updatedAt
.options({allowUnknown: true});

export default PaymentMethod