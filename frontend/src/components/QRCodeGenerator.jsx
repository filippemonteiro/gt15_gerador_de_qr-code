import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Link, FileText, User, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import QRCodePreview from './QRCodePreview';
import InputSection from './InputSection';
import CustomizationSection from './CustomizationSection';
import { validateUrl } from '../utils/validation';
import { generateQrCode } from '../services/qrService';

const QRCodeGenerator = () => {
  const [inputType, setInputType] = useState('url');
  const [inputValue, setInputValue] = useState('');
  const [qrSize, setQrSize] = useState(200);
  const [darkColor, setDarkColor] = useState('#000000');
  const [lightColor, setLightColor] = useState('#ffffff');
  const [format, setFormat] = useState('png');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (inputType === 'url') {
      setIsValid(validateUrl(inputValue));
    } else {
      setIsValid(inputValue.trim().length > 0);
    }
  }, [inputValue, inputType]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (isValid && inputValue) {
        handleGenerateQrCode();
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [inputValue, qrSize, darkColor, lightColor, format, isValid]);

  const handleGenerateQrCode = async () => {
    if (!isValid || !inputValue) return;
    
    setIsLoading(true);
    try {
      const qrData = {
        text: inputValue,
        size: qrSize,
        dark: darkColor.replace('#', ''),
        light: lightColor.replace('#', ''),
        format
      };
      
      const qrCodeUrl = await generateQrCode(qrData);
      setQrCodeUrl(qrCodeUrl);
    } catch (error) {
      console.error('Erro ao gerar código QR:', error);
      toast.error('Falha ao gerar código QR. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qrcode-${Date.now()}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Download do código QR realizado com sucesso!');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        <h3 className="text-xl font-semibold mb-4">1. Insira Suas Informações</h3>
        
        <InputSection 
          inputType={inputType}
          setInputType={setInputType}
          inputValue={inputValue}
          setInputValue={setInputValue}
          isValid={isValid}
        />
        
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">2. Personalize Seu Código QR</h3>
          
          <CustomizationSection 
            qrSize={qrSize}
            setQrSize={setQrSize}
            darkColor={darkColor}
            setDarkColor={setDarkColor}
            lightColor={lightColor}
            setLightColor={setLightColor}
            format={format}
            setFormat={setFormat}
          />
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="card flex flex-col"
      >
        <h3 className="text-xl font-semibold mb-4">Pré-visualização do Código QR</h3>
        
        <QRCodePreview 
          qrCodeUrl={qrCodeUrl} 
          isLoading={isLoading} 
          isValid={isValid}
          inputValue={inputValue}
        />
        
        <button 
          className={`btn btn-primary mt-4 flex items-center justify-center ${(!qrCodeUrl || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleDownload}
          disabled={!qrCodeUrl || isLoading}
        >
          <Download className="mr-2 h-5 w-5" />
          Baixar {format.toUpperCase()}
        </button>
      </motion.div>
    </div>
  );
};

export default QRCodeGenerator;
