import axios from 'axios';

const API_URL = '/api/qr';

export const generateQrCode = async (qrData) => {
  try {
    const response = await axios.post(`${API_URL}/generate`, qrData, {
      responseType: qrData.format === 'svg' ? 'text' : 'arraybuffer',
    });
    
    if (qrData.format === 'png') {
      const base64 = btoa(
        new Uint8Array(response.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      return `data:image/png;base64,${base64}`;
    }
    
    const blob = new Blob([response.data], { type: 'image/svg+xml' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Erro ao gerar o código QR:', error);
    throw new Error(error.response?.data?.message || 'Falha ao gerar o código QR');
  }
};

export const validateQrInput = async (qrData) => {
  try {
    const response = await axios.post(`${API_URL}/validate`, qrData);
    return response.data;
  } catch (error) {
    console.error('Erro ao validar os dados do código QR:', error);
    throw new Error(error.response?.data?.message || 'Falha ao validar os dados');
  }
};
