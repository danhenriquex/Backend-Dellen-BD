const  express = require('express');
const UserController = require('./controllers/UserController');
const CategoryController = require('./controllers/CategoryController');
const ProductController = require('./controllers/ProductController');
const OrderController = require('./controllers/OrderController');

const routes = express.Router();

routes.get('/', function(req, res) { res.json({hello : 'Welcome to dellen'});});

//Client
routes.get('/users',UserController.get_clients)
routes.post('/users',UserController.create_user)
routes.put('/users',UserController.update_user)
routes.post('/client',UserController.get_client)

//Seller
routes.get('/sellers',UserController.get_sellers)

//Category
routes.get('/category',CategoryController.index)
routes.post('/category',CategoryController.create)

//Product
routes.get('/products',ProductController.get_products)
routes.get('/products/:id',ProductController.products_by_id)
routes.post('/products',ProductController.create)
routes.put('/products/:category',ProductController.products_by_category)

//compras
routes.post('/order',OrderController.create_order)
routes.get('/order',OrderController.get_orders)
routes.get('/total',OrderController.total_amount)
module.exports = routes;
