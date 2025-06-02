import Joi from 'joi';

/**
 * Valida os parâmetros de entrada do código QR
 * @param {Object} data - Dados de entrada a serem validados
 * @returns {Object} Resultado da validação
 */
export const validateQrInput = (data) => {
  const schema = Joi.object({
    text: Joi.string().required().min(1).max(2048),
    size: Joi.number().integer().min(50).max(1000).default(200),
    dark: Joi.string().regex(/^[0-9A-Fa-f]{6}$/).default('000000'),
    light: Joi.string().regex(/^[0-9A-Fa-f]{6}$/).default('ffffff'),
    format: Joi.string().valid('png', 'svg').default('png')
  });

  return schema.validate(data);
};

/**
 * Valida uma string de URL
 * @param {String} url - URL a ser validada
 * @returns {Boolean} Se é uma URL válida
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};
