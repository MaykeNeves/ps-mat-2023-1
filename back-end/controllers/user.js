// importar o model correspondente ao controller
const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const controller = {}  // objeto vazio
/*
    Métodos CRUD do controller
    Create: cria um novo registro
    retrieve: lista(recupera) todos os registros
    retrieveOne: lista(recupera) apenas um registro
    update: atualiza um registro
    delete: exclui um registro
*/ 
controller.create = async (req, res) => {
    try {

        //Criptografar senha
        req.body.password = await bcrypt.hash(req.body.password, 12)
        await User.create(req.body)
        res.status(201).end()
    }
    catch(error){
        console.error(error)
    }
}

controller.retrieve = async (req,res) => {
    try{
        const data = await User.findAll()
        //HTTP 200: OK(Implícito)
        res.send(data)

    }
    catch(error){
        console.error(error)
    }
}

controller.retrieveOne = async (req,res) => {
    try{
        const data = await User.findByPk(req.params.id)


        //HTTP 200: OK(Implícito)
        if(data) res.send(data)

        else res.status(404).end()

    }
    catch(error){
        console.error(error)
    }
}

controller.update = async (req, res) => {
    try{

        //se houver sido passado o campo "password",
        //criptografa a senha
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 12)
            
        }

        const response = await User.update(
            req.body,
            { where: { id: req.params.id } }
        )
    

        //response retorna um vetor. O primeiro elmento
        // do vetor indica quantos resistreos foram afetados
        // pelo update
        if(response[0] > 0){
            // http 204: no content
            res.status(204).end()
        }

        else {
            //http 404: Not found
            res.status(404).end()
        }

    }

    catch(error){
        console.error(error)
    }
}

controller.delete = async (req,res) =>{
    try{
        const response = await User.destroy(
            { where: {id: req.params.id } }
        )
        
        if(response){//encontrou e excluiu

            //http 204: no content
            res.status(204).end()
        }
        else{ //não encontrou e não excluiu
            // http 404: not found
            res.status(404).end()
        }

    }
    catch(error){
         console.error(error)
    }
}

controller.login = async (req, res) => {
    try {
      const user = await User.scope('withPassword').findOne({ where: { email: req.body.email } })
  
      // Usuário não encontrado ~> HTTP 401: Unauthorized
      if(!user) return res.status(401).end()
  
      const pwMatches = await bcrypt.compare(req.body.password, user.password)
  
      if(pwMatches) {
        // A senha confere
        const token = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            verified_email: user.verified_email,
            is_admin: user.is_admin,
            phone: user.phone
          },
          process.env.TOKEN_SECRET,    // Chave para criptografar o token
          { expiresIn: '24h' }         // Duração do token
        )
  
        // Retorna o token ~> HTTP 200: OK (implícito)
        res.cookie('AUTH',token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            path: '/',
            maxAge: 24*60*60 // horas, em segundo
        })
        res.json({auth: true})

      }
      else {
        // Senha errada ~> HTTP 401: Unauthorized
        res.status(401).end()
      }
    }
    catch(error) {
      console.error(error)
    }
  }

controller.logout = (req,res) => {
    
        res.clearCookie('AUTH')
        res.json({auth: false})
    
}

module.exports = controller