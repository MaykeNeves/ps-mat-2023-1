// importar o model correspondente ao controller
const {Order,Channel,Carrier,ShipmentPriority,PaymentMethod,Customer} = require('../models')

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
        await Order.create(req.body)
        res.status(201).end()
    }
    catch(error){
        console.error(error)
    }
}

controller.retrieve = async (req,res) => {
    try{
        const data = await Order.findAll({
            include: [
                {model: Channel, as: 'channel'},
                {model: Carrier, as: 'carriers'},
                {model: ShipmentPriority, as: 'shipment_priority'},
                {model: PaymentMethod, as: 'orders'},
                {model: Customer, as: 'customer'}
                ]
        })
        //HTTP 200: OK(Implícito)
        res.send(data)

    }
    catch(error){
        console.error(error)
    }
}

controller.retrieveOne = async (req,res) => {
    try{
        const data = await Order.findByPk(req.params.id)


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
        const response = await Order.update(
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
        const response = await Order.destroy(
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


module.exports = controller