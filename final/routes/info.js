import { Router } from 'express';
import { information } from '../controllers/infoController.js';

export const info = Router();

info.get('/', information);
