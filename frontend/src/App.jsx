import React from 'react';
import { motion } from 'framer-motion';
import { QrCode } from 'lucide-react';
import QRCodeGenerator from './components/QRCodeGenerator';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <QrCode className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-slate-800">Gerador de QR Code</h1>
          </motion.div>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Crie seu QR Code Personalizado</h2>
              <p className="text-slate-600">Gere códigos QR para URLs, textos ou informações de contato com cores e tamanhos personalizáveis.</p>
            </div>
            
            <QRCodeGenerator />
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;