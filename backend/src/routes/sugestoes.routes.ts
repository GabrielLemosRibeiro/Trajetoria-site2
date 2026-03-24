import { Router } from 'express';
import { SugestoesController } from '../controllers/SugestoesController';

const sugestoesRoutes = Router();
const sugestoesController = new SugestoesController();

sugestoesRoutes.post('/', sugestoesController.create);
sugestoesRoutes.get('/', sugestoesController.list);
sugestoesRoutes.delete('/', sugestoesController.deleteAll);
sugestoesRoutes.delete('/:id', sugestoesController.delete);

export { sugestoesRoutes };
