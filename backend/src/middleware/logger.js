import morgan from 'morgan';
import { env } from '../config/env.js';

const developmentFormat = ':method :url :status :response-time ms - :res[content-length]';
const productionFormat = ':remote-addr - :method :url :status :response-time ms';

export const requestLogger = morgan(
  env.isProduction ? productionFormat : developmentFormat,
  {
    skip: (req) => req.url === '/api/v1/health',
  },
);
