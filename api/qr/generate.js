import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { validateQrInput } from '../../backend/src/utils/validation.js';

const app = express();

app.use(cors());
app.use(express.json());

const QUICKCHART_API_URL = 'https://quickchart.io/qr';

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

    const { text, size = 200, dark = '000000', light = 'ffffff', format = 'png' } = value;

    const response = await axios.get(QUICKCHART_API_URL, {
      params: { text, size, dark, light, format },
      responseType: format === 'svg' ? 'text' : 'arraybuffer',
    });

    if (format === 'svg') {
      res.setHeader('Content-Type', 'image/svg+xml');
    } else {
      res.setHeader('Content-Type', 'image/png');
    }

    res.send(response.data);
  } catch (error) {
    console.error('Erro ao gerar o código QR:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Falha ao gerar o código QR', 
      error: error.message 
    });
  }
}