//carrega as variaveis de ambiente do arquivo
//.env para a aplicação
require('dotenv').config()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Conexão do BD
const db = require('./models')

try {
    db.sequelize.authenticate()
    console.log('SEQUELIZE: connection has been established successfully.')
}
catch(error){
    console.error('* SEQUELIZE: unable to connect to the database: ', error)
    process.exit(1) // encerra o servidor com erro
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*          ROTAS           */
const users = require('./routes/users')
app.use('/users', users) 

const channels = require('./routes/channels')
app.use('/channels', channels)

const paymentMethods = require('./routes/payment_methods')
app.use('/payment_methods', paymentMethods)

const cities = require('./routes/cities')
app.use('/cities', cities)

const carriers = require('./routes/carriers')
app.use('/carriers',carriers)

const shipmentPriorities = require('./routes/shipment_priorities')
app.use('/shipment_priorities',shipmentPriorities)

const tags = require('./routes/tags')
app.use('/tags',tags)

const customers = require('./routes/customers')
app.use('/tags',customers)

const orderrelstatus = require('./routes/orderrelstatuses')
app.use('/tags',orderrelstatus)

const orderStatus = require('./routes/order_statuses')
app.use('/tags',orderStatus)

const customerTag = require('./routes/customer_tags')
app.use('/tags',customerTag)

const orderTag = require('./routes/order_tags')
app.use('/tags',orderTag)

const order = require('./routes/orders')
app.use('/tags',order)

module.exports = app;
