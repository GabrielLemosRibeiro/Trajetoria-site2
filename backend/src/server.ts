import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { sugestoesRoutes } from './routes/sugestoes.routes';

dotenv.config();
console.log('DATABASE_URL carregada:', process.env.DATABASE_URL ? 'Sim' : 'Não');

const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/api/sugestoes', sugestoesRoutes);

// Servir frontend apenas em desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend')));
}

app.get('/', (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
  } else {
    res.send('🚀 Servidor de Sugestões está rodando na porta 3000!');
  }
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
}

export default app;
