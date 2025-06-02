import axios from 'axios';
import { validateQrInput } from '../utils/validation.js';

// URL da API do QuickChart
const QUICKCHART_API_URL = 'https://quickchart.io/qr';

/**
 * Gera um código QR usando a API do QuickChart
 * @param {Object} req - Objeto de requisição do Express
 * @param {Object} res - Objeto de resposta do Express
 */
export const generateQrCode = async (req, res) => {
  try {
    // Valida o corpo da requisição
    const { error, value } = validateQrInput(req.body);
    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: error.details[0].message 
      });
    }

    const { text, size = 200, dark = '000000', light = 'ffffff', format = 'png' } = value;

    // Prepara os parâmetros da requisição para a API do QuickChart
    const params = {
      text,
      size,
      dark,
      light,
      format,
    };

    // Faz a requisição para a API do QuickChart
    const response = await axios.get(QUICKCHART_API_URL, {
      params,
      responseType: format === 'svg' ? 'text' : 'arraybuffer',
    });

    // Define os cabeçalhos da resposta com base no formato
    if (format === 'svg') {
      res.setHeader('Content-Type', 'image/svg+xml');
      res.send(response.data);
    } else {
      res.setHeader('Content-Type', 'image/png');
      res.send(Buffer.from(response.data, 'binary'));
    }
  } catch (error) {
    console.error('Erro ao gerar o código QR:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Falha ao gerar o código QR', 
      error: error.message 
    });
  }
};

/**
 * Obtém informações do QR code sem gerá-lo (apenas para validação)
 * @param {Object} req - Objeto de requisição do Express
 * @param {Object} res - Objeto de resposta do Express
 */
export const getQrInfo = async (req, res) => {
  try {
    // Valida o corpo da requisição
    const { error, value } = validateQrInput(req.body);
    if (error) {
      return res.status(400).json({ 
        success: false, 
        message: error.details[0].message 
      });
    }

    // Retorna sucesso com os dados validados
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
};
