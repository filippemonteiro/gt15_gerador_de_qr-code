import React from 'react';
import { motion } from 'framer-motion';
import { Sliders } from 'lucide-react';

const CustomizationSection = ({ 
  qrSize, 
  setQrSize, 
  darkColor, 
  setDarkColor, 
  lightColor, 
  setLightColor, 
  format, 
  setFormat 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Tamanho do QR Code
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="100"
            max="400"
            step="10"
            value={qrSize}
            onChange={(e) => setQrSize(parseInt(e.target.value))}
            className="flex-grow h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm font-medium bg-slate-100 py-1 px-2 rounded">
            {qrSize}px
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Cor Escura
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={darkColor}
              onChange={(e) => setDarkColor(e.target.value)}
              className="color-picker"
            />
            <input
              type="text"
              value={darkColor}
              onChange={(e) => setDarkColor(e.target.value)}
              className="input-field text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Cor Clara
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={lightColor}
              onChange={(e) => setLightColor(e.target.value)}
              className="color-picker"
            />
            <input
              type="text"
              value={lightColor}
              onChange={(e) => setLightColor(e.target.value)}
              className="input-field text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Formato do Arquivo
        </label>
        <div className="flex gap-2">
          {['png', 'svg'].map((formatOption) => (
            <motion.button
              key={formatOption}
              whileTap={{ scale: 0.95 }}
              className={`btn ${format === formatOption ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFormat(formatOption)}
            >
              {formatOption.toUpperCase()}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomizationSection;
