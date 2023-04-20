import React from 'react'
import  Typography  from '@mui/material/Typography'
import  Paper  from '@mui/material/Paper'
import { Button, TextField } from '@mui/material'

export default function Login(){

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    function handleChange(event){
        if (event.target.name === 'email') setEmail(event.target.value)
        else setPassword(event.target.value)
    }

    async function handleSubmit(event){
        event.preventDefault()
        try {
            let response = await fetch('http://localhost:3000/users/login', {
                method: "POST",
                body: JSON.stringify({email, password}),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            console.log({response})
                
        }

        catch(error) {
            console.error(error)
        }
    }

    return(
        <>
            <Typography variant='h3' component="h1" sx={{textAlign: 'center'}}>
                Autentique-se
            </Typography>
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