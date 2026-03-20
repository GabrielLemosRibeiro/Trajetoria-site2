import { prisma } from '../models/prismaClient';

interface CreateSugestaoDTO {
  nome: string;
  sugestao: string;
}

export class SugestoesService {
  async create({ nome, sugestao }: CreateSugestaoDTO) {
    if (!nome || !sugestao) {
      throw new Error('Nome e sugestão são obrigatórios.');
    }
    
    const novaSugestao = await prisma.sugestao.create({
      data: {
        nome,
        sugestao
      }
    });

    return novaSugestao;
  }

  async findAll() {
    const sugestoes = await prisma.sugestao.findMany({
      orderBy: {
        id: 'desc'
      }
    });
    return sugestoes;
  }
}
