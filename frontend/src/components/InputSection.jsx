import React from 'react';
import { Link, FileText, User, Check, AlertTriangle } from 'lucide-react';

const InputSection = ({ inputType, setInputType, inputValue, setInputValue, isValid }) => {
  const inputTypes = [
    { id: 'url', label: 'URL', icon: Link },
    { id: 'text', label: 'Texto', icon: FileText },
    { id: 'contact', label: 'Contato', icon: User }
  ];

  const getPlaceholder = () => {
    switch (inputType) {
      case 'url':
        return 'Digite uma URL (ex: https://exemplo.com)';
      case 'text':
        return 'Digite sua mensagem de texto';
      case 'contact':
        return 'Digite as informações de contato (ex: Nome, Email, Telefone)';
      default:
        return 'Digite a informação';
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {inputTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              className={`btn flex items-center ${inputType === type.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setInputType(type.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {type.label}
            </button>
          );
        })}
      </div>

      <div className="relative">
        <textarea
          className="input-field min-h-[100px]"
          placeholder={getPlaceholder()}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        
        {inputValue && (
          <div className="absolute right-3 top-3 flex items-center">
            {isValid ? (
              <div className="flex items-center text-green-600">
                <Check className="h-5 w-5 mr-1" />
                <span className="text-sm">Válido</span>
              </div>
            ) : (
              <div className="flex items-center text-amber-600">
                <AlertTriangle className="h-5 w-5 mr-1" />
                <span className="text-sm">Inválido</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-2 text-sm text-slate-500">
        {inputType === 'url' && (
          <p>Digite uma URL válida incluindo http:// ou https://</p>
        )}
        {inputType === 'text' && (
          <p>Digite qualquer mensagem de texto, citação ou informação</p>
        )}
        {inputType === 'contact' && (
          <p>Formato: Nome, Email, Telefone (um por linha)</p>
        )}
      </div>
    </div>
  );
};

export default InputSection;
