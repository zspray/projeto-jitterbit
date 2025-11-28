require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./src/routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para entender JSON
app.use(express.json());

// Para teste local simples: mongodb://localhost:27017/jitterbit_db
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/jitterbit_db')
.then(() => console.log('MongoDB conectado com sucesso'))
.catch(err => console.error('Erro ao conectar no MongoDB:', err));

// Rotas
app.use('/', orderRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});