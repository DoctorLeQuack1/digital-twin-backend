import { Router } from 'express';
const router = Router();
// import apiRoutes from './api/index.ts';
router.get('/api/test/', (req, res) => {
    res.json({ message: 'CORS funciona!' });
});
// router.use('/api', apiRoutes);
export default router;
