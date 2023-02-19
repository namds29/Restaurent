require('dotenv').config();
const express = require('express');
const router = express.Router();
const redirectURI = "auth/google";

const auth = require('../auth/auth')
const userController = require('../controllers/users.controller');

router.get('/', auth.authenToken, userController.getListCustomer);
router.get('/user', userController.getDetailCustomer);
router.post('/login', auth.login);
router.post('/register', userController.register);
router.post('/logout', auth.logout);
router.get("/auth/google/url", (req, res) => {
    res.send(auth.getGoogleAuthURL());
});
router.get(`/${redirectURI}`, auth.getUserFromGoogle)

module.exports = router;