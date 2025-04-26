import express from 'express';
import { login } from '../controllers/login.js';
import { signin } from '../controllers/signin.js';
import { validate } from '../controllers/validate.js';
const router = express.Router();
// POST /api/auth/signup
router.post('/signin', signin);
// POST /api/auth/login
router.post('/login', login);
// POST /api/auth/login
router.get('/validate', validate);
export default router;
