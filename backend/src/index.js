import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import qrRoutes from './routes/qrRoutes.js';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/qr', qrRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.send('A API Geradora de QR Code está em execução');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
