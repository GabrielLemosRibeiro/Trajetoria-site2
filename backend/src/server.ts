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

// Servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '../../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production' || process.env.LOCAL_TEST === 'true') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    if (process.env.NODE_ENV === 'production') {
      console.log('--- MODO DE PRODUÇÃO SIMULADO ---');
    }
  });
}

export default app;
