// responsável por todas as rotas da aplicação

const express = require('express');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const SectionToken = require('../services/models/tokenSection.js');

const Register = require('../controllers/register/index.js');
const Login = require('../controllers/login/index.js');
const Logout = require('../controllers/logout/index.js');
const CreatePost = require('../controllers/create-post.js');
const {Bold} = require('../controllers/actionsPost/index.js')

const GetControll = require('../controllers/GetControllers');
const JWT = require('../middleware/jwt/index.js');
const MidErr = require('../middleware/err/err.js')


router.use(express.static('./src/public'));
router.use('/jwt',JWT);

router.get('/',GetControll.Home);
router.get('/login',GetControll.Login);
router.get("/register",GetControll.Register)
router.get('/createuser',JWT,Register.Register);
router.get('/create-post',GetControll.CreatePost);
router.get('/:id/:id2',GetControll.ViewPost);
router.get('/notifcation',JWT,GetControll.Notification);

router.post('/sendToken',Register.SendToken);
router.post('/login',Login);
router.post('/create-post',JWT,CreatePost);
router.post('/token',async (request,response) => {
    const Token = request.body.token;
    jwt.verify(Token,process.env.SECRET,function(err) {
        if (err) {
            return response.status(401).json({messagem: 'Token Invalído'});
        };
        return response.status(200).json({messagem: 'Ok'});
    })
});

router.delete("/logout",JWT,Logout);

router.use(MidErr);

module.exports = router;
