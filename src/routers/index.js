const express = require('express');

const router = express.Router();

const UserController = require('../controllers/user-controller');
const AuthMiddleware = require('../middlewares/auth');

router.post('/signUp', UserController.signUp);
router.post('/login', UserController.signIn);

router.get('/test', AuthMiddleware.auth, (req,res) => {
    res.json({
        success: true,
        message: 'Welcome to the protected route for tests'
    })
})

router.get('/student', AuthMiddleware.auth, AuthMiddleware.isStudent, (req,res) => {
    res.json({
        success: true,
        message: 'Welcome Students'
    })
})

router.get('/admin', AuthMiddleware.auth, AuthMiddleware.isAdmin, (req,res) => {
    res.json({
        success: true,
        message: 'Welcome Admin'
    })
})

module.exports = router;