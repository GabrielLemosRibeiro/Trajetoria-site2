import { prisma } from '../models/prismaClient';

interface CreateSugestaoDTO {
  nome: string;
  sugestao: string;
}

// Retry helper para erros transientes do pooler Supabase (P1001)
async function withRetry<T>(fn: () => Promise<T>, retries = 3): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      const isLastAttempt = i === retries - 1;
      if (isLastAttempt || error?.code !== 'P1001') throw error;
      console.log(`[Retry ${i + 1}/${retries}] Erro de conexão, tentando novamente...`);
      await new Promise(r => setTimeout(r, 500 * (i + 1)));
    }
  }
  throw new Error('Max retries exceeded');
}

export class SugestoesService {
  async create({ nome, sugestao }: CreateSugestaoDTO) {
    if (!nome || !sugestao) {
      throw new Error('Nome e sugestão são obrigatórios.');
    }
    return withRetry(() => prisma.sugestao.create({
      data: { nome, sugestao, isDeleted: false }
    }));
  }

  async findAll() {
    return withRetry(() => prisma.sugestao.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' }
    }));
  }

  async findHistory() {
    return withRetry(() => prisma.sugestao.findMany({
      orderBy: { createdAt: 'desc' }
    }));
  }

  async softDelete(id: number) {
    return withRetry(() => prisma.sugestao.update({
      where: { id },
      data: { isDeleted: true }
    }));
  }

  async deleteAll() {
    return withRetry(() => prisma.sugestao.updateMany({
      data: { isDeleted: true }
    }));
  }
}
