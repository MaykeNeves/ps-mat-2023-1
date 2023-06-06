import React from 'react'
import  Typography  from '@mui/material/Typography'
import  Paper  from '@mui/material/Paper'
import { Button, TextField, snackbarClasses } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Notification from '../components/ui/Notification'
import myfetch from '../utils/myfetch'
import PageTitle from '../components/ui/PageTitle'
import { useNavigate } from 'react-router-dom'

export default function Login({ onLoginLogout}){

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [showWaiting, setShowWaiting] = React.useState(false)
    const [notif, setNotif] = React.useState({
        show: false,
        message: '',
        severity: 'success'
    })

    const navigate = useNavigate()

    function handleChange(event){
        if (event.target.name === 'email') setEmail(event.target.value)
        else setPassword(event.target.value)
    }

    async function handleSubmit(event){
        event.preventDefault()  //impede o recarregamento da página
        setShowWaiting(true)    //mostra o spinner de espera
        try {

            const result = await myfetch.post('/users/login', {email, password})

            //grava o toekn recebido no localstrorage
            window.localStorage.setItem('token',result.token)
                
                
                //exobe o snackbar
                setNotif({
                    show:true,
                    message: 'Autenticação realizada com sucesso!',
                    severity: 'success'
                })

                onLoginLogout(true)

                navigate('/')   //vai para a página inicial
             
        }

        catch(error) {
            console.error(error)
           

            //apaga o token de autenticação no localStorage, case exista
            window.localStorage.removeItem('token')

             //Exibe o snackbar de erro
            setNotif({
                show:true,
                message: error.message,
                severity: 'error'
            })
        }
        finally{
            setShowWaiting(false) // esconde o spinner de espera
        }
    }

    function handleNotifClose(event, reason) {
        if (reason === 'clickaway') {
          return;
        }

        setNotif({ show:false})
    }

    return(
        <>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={showWaiting}>
            <CircularProgress color="inherit" />
            </Backdrop>

            <Notification show={notif.show} severity={notif.severity} onClose={handleNotifClose}>

                {notif.message}
            </Notification>

           <PageTitle title="Autentique-se" />

            <Paper sx={{
                width: '512px',
                maxWidth: '90%',
                margin: '25px auto 0 auto',
                p: '12px'
            }}>
                <Typography variant="h5" component="div">
                    <form onSubmit={handleSubmit}>
                    <TextField 
                        id="email"
                        className="form-field"
                        name="email"
                        label="E-mail"
                        variant="filled"
                        fullWidth
                        onChange={handleChange}
                        value={email}    
                            
                        />

                    <TextField 
                        id="password"
                        className="form-field"
                        name="password"
                        label="Senha"
                        variant="filled"
                        type="password"
                        fullWidth    
                        onChange={handleChange}
                        value={password}
                            
                        /> 

                    <Button variant="contained" type="submit" color='secondary' fullWidth>
                        Enviar

                    </Button>

                    </form>

                    

                </Typography>
            </Paper>
        </>
    )
}