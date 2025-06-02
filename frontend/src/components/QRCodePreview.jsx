import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Loader2 } from 'lucide-react';

const QRCodePreview = ({ qrCodeUrl, isLoading, isValid, inputValue }) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 bg-slate-50 rounded-lg">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center"
          >
            <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-4" />
            <p className="text-slate-600">Gerando seu código QR...</p>
          </motion.div>
        ) : qrCodeUrl ? (
          <motion.div
            key="qrcode"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <img 
              src={qrCodeUrl} 
              alt="Código QR Gerado" 
              className="max-w-full max-h-64 object-contain rounded-lg shadow-sm" 
            />
            <p className="mt-4 text-sm text-center text-slate-600 max-w-xs break-words">
              {inputValue}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-slate-400"
          >
            <QrCode className="h-16 w-16 mb-4" strokeWidth={1} />
            <p className="text-center">
              {!inputValue ? (
                "Insira informações para gerar um código QR"
              ) : !isValid ? (
                "Por favor, insira informações válidas"
              ) : (
                "O código QR aparecerá aqui"
              )}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QRCodePreview;
