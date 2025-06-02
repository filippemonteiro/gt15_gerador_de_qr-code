import express from 'express';
import cors from 'cors';
import { validateQrInput } from '../../backend/src/utils/validation.js';

const app = express();

app.use(cors());
app.use(express.json());

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const { error, value } = validateQrInput(req.body);
    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: error.details[0].message 
      });
    }

    res.status(200).json({
      success: true,
      data: value,
      message: 'Entrada validada com sucesso'
    });
  } catch (error) {
    console.error('Erro ao validar os dados do QR:', error);
    res.status(500).json({
      success: false,
      message: 'Erro do servidor durante a validação',
      error: error.message
    });
  }
}