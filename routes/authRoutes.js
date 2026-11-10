const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rutas de Registro
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

// Rutas de Login
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Ruta Home y Logout
router.get('/home', (req, res) => {
    res.render('home', { user: { email: 'invitado@test.com', uid: '123456' } });
});
router.get('/logout', authController.logout);

module.exports = router;