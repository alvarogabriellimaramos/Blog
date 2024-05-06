// responsável por todas as rotas da aplicação

const express = require('express');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Register = require('../controllers/register/index.js');
const Login = require('../controllers/login/index.js');
const Logout = require('../controllers/logout/index.js');
const CreatePost = require('../controllers/create-post.js');
const Comments = require("../controllers/create-comments.js");
const GetControll = require('../controllers/GetControllers');
const Notification = require('../controllers/notification.js');
const EditProfilePut = require('../controllers/puts/index.js');

const JWT = require('../middleware/jwt/index.js');
const MidErr = require('../middleware/err/err.js')


router.use(express.static('./src/public'));
router.use('/jwt',JWT);


router.get('/',GetControll.Home);
router.get('/login',GetControll.Login);

router.get("/register",GetControll.Register)
router.get('/createuser',JWT,Register.Register);
router.get('/create-post',GetControll.CreatePost);
router.get('/edit-profile',JWT,GetControll.EditProfile);
router.get("/my-post",JWT,GetControll.MyPost);
router.get('/notification',JWT,GetControll.Notification);
router.get("/view-notification",JWT,GetControll.ViewNotification);
router.get("/username/:username",GetControll.GetUsername);
router.get('/view-post/:id/:id2',GetControll.ViewPost);
router.get('/user/:id',GetControll.ViewProfileUser);



router.post('/sendToken',Register.SendToken);
router.post('/login',Login);
router.post('/create-post',JWT,function (request,response,next) {
    const {header,strong,paragrafo,ul} = request.body;
    request.tags = {header,strong,paragrafo,ul};
    next();
},CreatePost);
router.post('/token',async (request,response) => {
    const Token = request.body.token;
    jwt.verify(Token,process.env.SECRET,function(err) {
        if (err) {
            return response.status(401).json({messagem: 'Token Invalído'});
        };
        return response.status(200).json({messagem: 'Ok'});
    })
});
router.post("/create-comments",JWT,Comments.Comments);
router.post("/response-comments",JWT,Comments.ResponseComment);

router.put('/edit-profile',JWT,EditProfilePut);

router.delete("/logout",JWT,Logout);
router.delete('/delete-notification',JWT,Notification);

router.use('/404',MidErr);
router.use(MidErr)
module.exports = router;
