import express from 'express';
import { generateQrCode, getQrInfo } from '../controllers/qrController.js';

const router = express.Router();

// Rota para gerar o código QR
router.post('/generate', generateQrCode);

// Rota para validar a entrada sem gerar o código QR
router.post('/validate', getQrInfo);

export default router;
