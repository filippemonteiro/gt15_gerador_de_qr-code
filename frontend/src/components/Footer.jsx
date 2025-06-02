import React from 'react';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-slate-300">
              &copy; {new Date().getFullYear()} Gerador de QR Code
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/filippemonteiro/gt15_gerador_de_qr-code" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://quickchart.io/documentation/qr-codes/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Desenvolvido por Filippe Monteiro com a API do QuickChart
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
