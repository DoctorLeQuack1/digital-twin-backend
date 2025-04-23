import express from 'express';
import { login } from '../controllers/login.js';
import { signin } from '../controllers/signin.js';
const router = express.Router();
// POST /api/auth/signup
router.post('/signin', signin);
// POST /api/auth/login
router.post('/login', login);
export default router;
