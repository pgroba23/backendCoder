import { Router } from 'express';
import { register, login } from '../controllers/loginController.js';

export const loginRoute = Router();

// REGISTER
loginRoute.post('/register', register);

// LOGIN
loginRoute.post('/login', login);
