import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import auth from '../auth/auth.js'
import userController from '../controllers/users.controller.js';

const router = express.Router();

router.get('/', auth.authenToken, userController.getListCustomer);
router.get('/user', userController.getDetailCustomer);
router.post('/login', auth.login);
router.post('/register', userController.register);
router.post('/logout', auth.logout);
router.get("/auth/google/url", (req, res) => {
    res.json(auth.getGoogleAuthURL());
});

export default router;