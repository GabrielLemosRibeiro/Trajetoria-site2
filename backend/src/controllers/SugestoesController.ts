import { Request, Response } from 'express';
import { SugestoesService } from '../services/SugestoesService';

export class SugestoesController {
  async create(req: Request, res: Response) {
    const { nome, sugestao } = req.body;
    const sugestoesService = new SugestoesService();

    try {
      const novaSugestao = await sugestoesService.create({ nome, sugestao });
      return res.status(201).json(novaSugestao);
    } catch (error: any) {
      console.error('Erro ao criar sugestão:', error);
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response) {
    const { history } = req.query;
    const sugestoesService = new SugestoesService();

    try {
      if (history === 'true') {
        const sugestoes = await sugestoesService.findHistory();
        return res.json(sugestoes);
      }
      const sugestoes = await sugestoesService.findAll();
      return res.json(sugestoes);
    } catch (error: any) {
      console.error('Erro ao listar sugestões:', error);
      return res.status(500).json({ error: 'Erro ao buscar sugestões.' });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const sugestoesService = new SugestoesService();

    try {
      await sugestoesService.softDelete(Number(id));
      return res.status(204).send();
    } catch (error: any) {
      console.error('Erro ao deletar sugestão:', error);
      return res.status(400).json({ error: 'Erro ao deletar sugestão.' });
    }
  }

  async deleteAll(req: Request, res: Response) {
    const sugestoesService = new SugestoesService();

    try {
      await sugestoesService.deleteAll();
      return res.status(204).send();
    } catch (error: any) {
      console.error('Erro ao deletar todas as sugestões:', error);
      return res.status(500).json({ error: 'Erro ao deletar todas as sugestões.' });
    }
  }
}
