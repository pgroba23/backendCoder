import { Router } from 'express';
import { register, login } from '../controllers/loginController.js';

export const loginRoute = Router();
export const registerRoute = Router();

// REGISTER
registerRoute.post('/', register);

// LOGIN
loginRoute.post('/login', login);
