import React from 'react';
import { Link, FileText, User, Check, AlertTriangle } from 'lucide-react';

const InputSection = ({ inputType, setInputType, inputValue, setInputValue, isValid }) => {
  const inputTypes = [
    { id: 'url', label: 'URL', icon: Link },
    { id: 'text', label: 'Text', icon: FileText },
    { id: 'contact', label: 'Contact', icon: User }
  ];

  const getPlaceholder = () => {
    switch (inputType) {
      case 'url':
        return 'Enter a URL (e.g., https://example.com)';
      case 'text':
        return 'Enter your text message';
      case 'contact':
        return 'Enter contact info (e.g., Name, Email, Phone)';
      default:
        return 'Enter information';
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
                <span className="text-sm">Valid</span>
              </div>
            ) : (
              <div className="flex items-center text-amber-600">
                <AlertTriangle className="h-5 w-5 mr-1" />
                <span className="text-sm">Invalid</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-2 text-sm text-slate-500">
        {inputType === 'url' && (
          <p>Enter a valid URL including http:// or https://</p>
        )}
        {inputType === 'text' && (
          <p>Enter any text message, quote, or information</p>
        )}
        {inputType === 'contact' && (
          <p>Format: Name, Email, Phone (one per line)</p>
        )}
      </div>
    </div>
  );
};

export default InputSection;