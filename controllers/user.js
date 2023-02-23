// importar o model correspondente ao controller
const {User} = require('../models')

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
        await User.create(req.body)
        res.status(201).end()
    }
    catch(error){
        console.error(error)
    }
}

module.exports = controller