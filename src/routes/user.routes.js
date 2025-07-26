import {Router} from 'express';
import { registerUser } from '../controllers/user.controllers.js';
import upload from '../middlewares/multer.middlewares.js';

const router = Router();


//router.route(path).httpMethod(middlewares)

router.route('/register').post(upload.single('avatar'), registerUser);
// router.route('/login').post(loginUser)
export default router;