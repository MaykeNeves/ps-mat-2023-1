import React from 'react'
import PageTitle from '../../components/ui/PageTitle'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Fab from '@mui/material/Fab'
import myfetch from '../../utils/myfetch';
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Notification from '../../components/ui/Notification';
import { useNavigate, useParams  } from 'react-router-dom';
import Tag from '../../models/Tag';
import getValidationMessages from '../../utils/getValidationMessages';

export default function TagForm(){

    const API_PATH = '/tags'

    const navigate = useNavigate()
    const params = useParams()

    const [state,setState] = React.useState({
        tag: {
            description: '',
            color: '',
            type: 0
            
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
        tag,
        errors,
        showWaiting,
        notif
    } = state

    function handleFormFieldChange(event){
        const tagCopy = {...tag}
        tagCopy[event.target.name] = event.target.value
        setState({...state, tag: tagCopy})
    }

    function handleFormSubmit(event) {
        event.preventDefault()      //evita que a pagina seja recarregada

        //envia os dados para o back-end
        sendData()
    }

    //Este useEffect será executando apenas durante o carregamento
    //inicial da página
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
                tag:result,
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
            await Tag.validateAsync(tag, {abortEarly: false})

             // Registro já existe: chama PUT para atualizar
             if (params.id) await myfetch.put(`${API_PATH}/${params.id}`, tag)
      
             // Registro não existe: chama POST para criar
             else await myfetch.post(API_PATH, tag)
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

            console.error(error)
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
            

            <PageTitle title={params.id ? "Editar Etiqueta" : "Cadastrar nova etiqueta"} />


            <form onSubmit={handleFormSubmit}>
            <TextField 
            label="description"
            variant="filled"
            required
            fullWidth
            name="description"    // Nome do campo na tabela
            value={tag.description}        //Nome do campo na tabela
            onChange= {handleFormFieldChange}
            error={errors?.description}
            helperText={errors?.description}
            />

            <TextField 
            label="color"
            variant="filled"
            required
            fullWidth
            name="color"    // Nome do campo na tabela
            value={tag.color}        //Nome do campo na tabela
            onChange= {handleFormFieldChange}
            error={errors?.color}
            helperText={errors?.color}
            />

            <TextField 
            label="type"
            variant="filled"
            required
            fullWidth
            name="type"    // Nome do campo na tabela
            value={tag.type}        //Nome do campo na tabela
            onChange= {handleFormFieldChange}
            error={errors?.type}
            helperText={errors?.type}
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
