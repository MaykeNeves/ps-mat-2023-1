import React from 'react'
import PageTitle from '../../components/ui/PageTitle'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Fab from '@mui/material/Fab'
import myfetch from '../../utils/myfetch';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Notification from '../../components/ui/Notification';
import { useNavigate } from 'react-router-dom';
import CarrierMethod from '../../models/CarrierMethod';
import getValidationMessages from '../../utils/getValidationMessages';

export default function CarrierMethodForm(){

    const API_PATH = '/carriers'

    const navigate = useNavigate()

    const [state,setState] = React.useState({
        carrierMethod: {
            name: ''
            
        },
        errors: {},
        showWaiting: false,
        notif: {
            show: false,
            severity: 'success',
            message: ''
        }
    })

    const{
        carrierMethod,
        errors,
        showWaiting,
        notif
    } = state

    function handleFormFieldChange(event){
        const carrierMethodCopy = {...carrierMethod}
        carrierMethodCopy[event.target.name] = event.target.value
        setState({...state, carrierMethod: carrierMethodCopy})
    }

    function handleFormSubmit(event) {
        event.preventDefault()      //evita que a pagina seja recarregada

        //envia os dados para o back-end
        sendData()
    }

    async function sendData(){
        setState({ ...state, showWaiting: true, errors: {} })
        try {
            //Chama a validação da biblioteca Joi
            await CarrierMethod.validateAsync(carrierMethod)


            await myfetch.post(API_PATH, carrierMethod)
            // Dar feedBack positivo e votlar para a listagem
            setState({
                ...state,
                showWaiting: false,
                
                notif: {
                    severity: 'success',
                    show: true,
                    message: 'Novo item salvo com sucesso'
                }
            })
            
        }
        catch(error){
            const { validationError, errorMessages } = getValidationMessages(error)

            console.log(error)
            // Dar FeedBack Negativo
            setState({ 
                ...state, 
                showWaiting: false,
                errors: errorMessages,
                notif: {
                    severity: 'error',
                    show: !validationError,
                    message: 'ERRO: ' + error.message
                }
            })
        }
    }


    function handleNotifClose(event, reason) {
        if (reason === 'clickaway') {
          return;
        }
        
        // se o item foi salvo com sucesso, retorna à pagina de listagem
        if(notif.severity === 'success') navigate(-1)

        setState({...state,notif: {...notif, show: false}})
    }

    return (
        <>

            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showWaiting}>
            <CircularProgress color="inherit" />
            </Backdrop>

            <Notification show={notif.show} severity={notif.severity} onClose={handleNotifClose}>

            {notif.message} 
            </Notification>
            

            <PageTitle title="Cadastrar novo transportador" />

            <div>{notif.severity}</div>

            <form onSubmit={handleFormSubmit}>
            <TextField 
            label="name"
            variant="filled"
            required
            fullWidth
            name="name"    // Nome do campo na tabela
            value={carrierMethod.name}        //Nome do campo na tabela
            onChange= {handleFormFieldChange}
            error={errors?.name}
            helperText={errors?.name}
            />

        <Fab 
        variant="extended" 
        color="secondary"
        type="submit"
        
        >
        <SendIcon sx={{ mr: 1 }} />
        Enviar
        </Fab>

  

        </form>
       
        
        </>
    )
}
