const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {

    const bypassRoutes = [
        { url: '/users/login', method: 'POST'}
    ]

    for(let route of bypassRoutes){
        if(route.url === req.url && route.method === req.method) {
            next()
            return
        }
    }

    //necessario ter o token para continuar
    // const bearerHeader = req.headers['authorization']

    // p tplem map fpo ássp -> HTTP 403:
    //forbidden
    // if(!bearerHeader) return res.status(403).end()

        
    // const temp = bearerHeader.split(' ')
    // const token = temp[1]


    //verifica se otoken foi enviado por meio de cookie
    const token = req.cookies['AUTH']
    //console.log({token})

    // se nao fouver token -> HTTP 403: Forbidden
    if(!token) return res.status(403).end()

    //validando o token
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) =>{

        //token invalido ou expirado -> http 403: forbidden
        if(error) return res.status(403).end()

        //se chegamos até aqui, o token está Ok e temos 
        //as informações do usuario logado no parametro "decoded"
        //vamos guardar isso na request para usar depois
        req.authUser = decoded

        console.log({authUser: req.authUser})
        next()
    })

    
}