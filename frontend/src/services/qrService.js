import axios from 'axios';

const API_URL = '/api/qr';

/**
 * Gera um código QR usando o serviço do backend
 * @param {Object} qrData - Dados do código QR
 * @returns {Promise<string>} URL do código QR como data URL
 */
export const generateQrCode = async (qrData) => {
  try {
    const response = await axios.post(`${API_URL}/generate`, qrData, {
      responseType: qrData.format === 'svg' ? 'text' : 'arraybuffer',
    });
    
    // Converte dados binários para base64 no caso do formato PNG
    if (qrData.format === 'png') {
      const base64 = btoa(
        new Uint8Array(response.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      return `data:image/png;base64,${base64}`;
    }
    
    // Para SVG, cria uma URL de blob
    const blob = new Blob([response.data], { type: 'image/svg+xml' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Erro ao gerar o código QR:', error);
    throw new Error(error.response?.data?.message || 'Falha ao gerar o código QR');
  }
};

/**
 * Valida os dados de entrada do código QR sem gerá-lo
 * @param {Object} qrData - Dados do código QR a serem validados
 * @returns {Promise<Object>} Resultado da validação
 */
export const validateQrInput = async (qrData) => {
  try {
    const response = await axios.post(`${API_URL}/validate`, qrData);
    return response.data;
  } catch (error) {
    console.error('Erro ao validar os dados do código QR:', error);
    throw new Error(error.response?.data?.message || 'Falha ao validar os dados');
  }
};