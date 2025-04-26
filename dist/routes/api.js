import express from 'express';
import { fetch_glb } from '../controllers/fetchAssets.js';
const router = express.Router();
// POST /api/auth/signup
router.get('/asset', fetch_glb);
export default router;
