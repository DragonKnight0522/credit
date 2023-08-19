import { Router } from 'express';
import * as controller from './controller';

const router = Router();

router.get('/', controller.getCskhContent).put('/', controller.updateCskhContent);

export default router;
