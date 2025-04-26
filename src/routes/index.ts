import { Router } from 'express';
import auth from './auth.js';
import api from './api.js'
const router = Router();

router.use('/auth', auth);
router.use('/api', api);

export default router;
