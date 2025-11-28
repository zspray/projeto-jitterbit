const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Definição das rotas conforme URLs solicitadas [cite: 228, 229, 231]
router.post('/order', orderController.createOrder);
router.get('/order/list', orderController.listOrders);
router.get('/order/:id', orderController.getOrder);
router.put('/order/:id', orderController.updateOrder);
router.delete('/order/:id', orderController.deleteOrder);

module.exports = router;