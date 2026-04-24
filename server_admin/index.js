import dotenv from 'dotenv';

// 1. Cargar variables de entorno PRIMERO
dotenv.config();

// 2. Manejo de errores globales
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception in Admin Server:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', err);
  process.exit(1);
});

// 3. Import dinámico DESPUÉS de cargar dotenv
import('./configs/app.js').then(({ initServer }) => {
  console.log('Starting KinalSports Admin Server...');
  initServer();
});