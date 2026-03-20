import { Router } from 'express';
import { SugestoesController } from '../controllers/SugestoesController';

const sugestoesRoutes = Router();
const sugestoesController = new SugestoesController();

sugestoesRoutes.post('/', sugestoesController.create);
sugestoesRoutes.get('/', sugestoesController.list);

export { sugestoesRoutes };
