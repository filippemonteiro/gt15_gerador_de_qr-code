/**
 * Valida uma string de URL
 * @param {string} url - URL a ser validada
 * @returns {boolean} É uma URL válida
 */
export const validateUrl = (url) => {
  if (!url) return false;
  
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

/**
 * Valida um código de cor hexadecimal
 * @param {string} color - Código de cor hexadecimal
 * @returns {boolean} É um código hexadecimal válido
 */
export const validateHexColor = (color) => {
  return /^#[0-9A-F]{6}$/i.test(color);
};

/**
 * Converte uma cor hexadecimal para RGB
 * @param {string} hex - Código de cor hexadecimal
 * @returns {Object} Objeto de cor RGB
 */
export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};
