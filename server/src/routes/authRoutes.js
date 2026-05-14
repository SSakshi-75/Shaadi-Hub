import express from 'express';
import { register, login, forgotPassword, resetPassword, googleLogin } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);
router.post('/google-login', googleLogin);

export default router;
