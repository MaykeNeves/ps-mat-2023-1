import React from 'react'
import PageTitle from '../../components/ui/PageTitle'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Fab from '@mui/material/Fab'
import myfetch from '../../utils/myfetch';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Notification from '../../components/ui/Notification';
import { useNavigate, useParams } from 'react-router-dom';
import OrderStatus from '../../models/OrderStatus';
import getValidationMessages from '../../utils/getValidationMessages';

export default function OrderStatusForm(){

    const API_PATH = '/order_statuses'

    const navigate = useNavigate()
    const params = useParams()

    const [state,setState] = React.useState({
        orderStatus: {
            sequence: '',
            description: ''
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
        orderStatus,
        errors,
        showWaiting,
        notif
    } = state

    function handleFormFieldChange(event){
        const orderStatusCopy = {...orderStatus}
        orderStatusCopy[event.target.name] = event.target.value
        setState({...state, orderStatus: orderStatusCopy})
    }

    function handleFormSubmit(event) {
        event.preventDefault()      //evita que a pagina seja recarregada

        //envia os dados para o back-end
        sendData()
    }

    React.useEffect( () => {
        // Se houver parâmetro id na rota, devemos caregar um registro
        // existente para edição
        if(params.id) fetchData()
    },[])

    async function fetchData() {
        setState({...state, showWaiting: true, errors:{ }})
        try{
            const result = await myfetch.get(`${API_PATH}/${params.id}`)
            setState({
                ...state,
                orderStatus:result,
                showWaiting: false
            })
        }
        catch(error){
            console.error(error)
            setState({ 
                ...state, 
                showWaiting: false,
                errors: errorMessages,
                notif: {
                    severity: 'error',
                    show: true,
                    message: 'ERRO: ' + error.message
                }
            })
        }
    }

    async function sendData(){
        setState({ ...state, showWaiting: true, errors: {} })
        try {
            //Chama a validação da biblioteca Joi
            await OrderStatus.validateAsync(orderStatus)


            await myfetch.post(API_PATH, orderStatus)
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
            

            <PageTitle title={params.id ? "Editar ordem status" : "Cadastrar novo ordem status"} />

            <div>{notif.severity}</div>

            <form onSubmit={handleFormSubmit}>
            <TextField 
            label="Sequencia"
            variant="filled"
            required
            fullWidth
            name="sequencia"    // Nome do campo na tabela
            value={orderStatus.sequencia}        //Nome do campo na tabela
            onChange= {handleFormFieldChange}
            error={errors?.sequencia}
            helperText={errors?.sequencia}
            />
        
            <TextField 
            label="Descricao"
            variant="filled"
            
            required
            fullWidth
            name="descricao"    // Nome do campo na tabela
            value={orderStatus.description}        //Nome do campo na tabela
            onChange= {handleFormFieldChange}
            error={errors?.description}
            helperText={errors?.description}
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