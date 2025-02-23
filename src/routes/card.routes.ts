import { Router} from 'express';
import {*} from '@controllers/cardController';

const router = Router();


router.post('/activate', activateCard);


export default router;