import Joi from 'joi'



const CarrierMethod = Joi.object({
    
    name: Joi.string()
    .min(2)
    .max(30)
    .required()
    .messages(new Error('A descrição é obrigatória (entre 2 e 30 caracteres)')),

    
})
// Permite campos não validados, como id createdAt e updatedAt
.options({allowUnknown: true});

export default CarrierMethod