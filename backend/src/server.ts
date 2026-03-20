import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sugestoesRoutes } from './routes/sugestoes.routes';

dotenv.config();
console.log('DATABASE_URL carregada:', process.env.DATABASE_URL ? 'Sim' : 'Não');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/sugestoes', sugestoesRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Servidor de Sugestões está rodando na porta 3000!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
