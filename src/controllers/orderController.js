const Order = require('../models/Order');

// Função auxiliar para mapear (transformar) os dados conforme solicitado
const mapOrderData = (data) => {
    return {
        orderId: data.numeroPedido,
        value: data.valorTotal,
        creationDate: data.dataCriacao,
        items: data.items.map(item => ({
            productId: Number(item.idItem), // Converte string para number se necessário
            quantity: item.quantidadeItem,
            price: item.valorItem
        }))
    };
};

module.exports = {
    // 1. Criar Pedido (POST) [cite: 228]
    async createOrder(req, res) {
        try {
            // Transformação dos dados (De Português -> Inglês) 
            const orderData = mapOrderData(req.body);

            const newOrder = new Order(orderData);
            await newOrder.save();

            res.status(201).json({ message: "Pedido criado com sucesso!", order: newOrder });
        } catch (error) {
            res.status(400).json({ error: "Erro ao criar pedido", details: error.message });
        }
    },

    // 2. Obter Pedido por ID (GET) [cite: 229]
    async getOrder(req, res) {
        try {
            const { id } = req.params;
            // Busca pelo campo customizado 'orderId', não pelo _id do Mongo
            const order = await Order.findOne({ orderId: id });

            if (!order) {
                return res.status(404).json({ error: "Pedido não encontrado" });
            }

            res.status(200).json(order);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar pedido" });
        }
    },

    // 3. Listar todos os pedidos (GET - Opcional) [cite: 231]
    async listOrders(req, res) {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: "Erro ao listar pedidos" });
        }
    },

    // 4. Atualizar Pedido (PUT - Opcional) [cite: 233]
    async updateOrder(req, res) {
        try {
            const { id } = req.params;
            
            // Se o usuário mandar dados em português, precisamos mapear novamente
            const updateData = mapOrderData(req.body);

            const updatedOrder = await Order.findOneAndUpdate(
                { orderId: id }, 
                updateData, 
                { new: true } // Retorna o objeto atualizado
            );

            if (!updatedOrder) {
                return res.status(404).json({ error: "Pedido não encontrado para atualização" });
            }

            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json({ error: "Erro ao atualizar pedido" });
        }
    },

    // 5. Deletar Pedido (DELETE - Opcional) [cite: 234]
    async deleteOrder(req, res) {
        try {
            const { id } = req.params;
            const deletedOrder = await Order.findOneAndDelete({ orderId: id });

            if (!deletedOrder) {
                return res.status(404).json({ error: "Pedido não encontrado para exclusão" });
            }

            res.status(200).json({ message: "Pedido removido com sucesso" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar pedido" });
        }
    }
};