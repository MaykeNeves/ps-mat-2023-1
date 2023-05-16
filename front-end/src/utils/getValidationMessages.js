import  { ValidationError} from 'joi'

export default function getValidationMessages(error){

    //Verifica se o erro passado foi gerado pelo JOi
    if(error instanceof ValidationError) {
        const result = {
            validationError: true,
            errorMessages: {}
        }

        for(let e of error.details){
            result.errorMessages[e.context.key] = e.message
        }

        return result
    }
    else return { validationError: false, errorMessages: {} }
}