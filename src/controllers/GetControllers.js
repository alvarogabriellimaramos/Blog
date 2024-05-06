//responsável por todos os controllers GET
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const PostModel = require("../services/models/postagens");
const NotificationModel = require("../services/models/notification");
const UserModel = require('../services/models/profile');
const RegisterModel = require("../services/models/registros");

module.exports = {
    async Home (request,response) {
        const PostsAll = await PostModel.find();
        return response.render('home',{
            cssFiles: ["css/header.css","css/main.css",'css/index.css'],
            jsFiles: ["js/index.js"],
            title: "Home",
            PORT: process.env.PORT,
            PostsAll,
            img: "http://localhost:8080/imgs/node.png"
        });
    },
    Login (request,response) {
        return response.status(200).render('login/login',{
            title: "Login Page",
            cssFiles: [
            'http://localhost:8080/css/forms/form.css',
            'http://localhost:8080/css/index.css'
        ],
            jsFiles: ["http://localhost:8080/js/login.js"],
            img: 'http://localhost:8080/imgs/user.png'
        });
    },
    Register (request,response) {
        return response.status(200).render('register/register',{
            title: 'Register Page',
            cssFiles: ["http://localhost:8080/css/index.css","http://localhost:8080/css/forms/form.css"],
            jsFiles: ['http://localhost:8080/js/register.js'],
            img: 'http://localhost:8080/imgs/cadeado.png'
        });
    } ,
    async CreatePost(request,response,next) {
        return response.status(200).render('create-post',{
            title: 'Criar nova postagem',
            cssFiles: ["css/header.css",'css/post/create-post.css','css/index.css'],
            jsFiles: ["js/index.js",'js/create-post.js'],
            img: "http://localhost:8080/imgs/node.png",
            PORT: process.env.PORT
        });
    },
    async ViewPost (request,response) {
        
        const id = request.params.id;

        const id2 = request.params.id2;

        if (
        !mongoose.Types.ObjectId.isValid(id) 
        || 
        !mongoose.Types.ObjectId.isValid(id2)) {
            return response.status(404).redirect('/404');
        };
        const Postagem = await PostModel.findById(id);
        if (!Postagem) {
            return response.status(404).redirect("/404")
        }
        const PostUser = Postagem.Posts.filter(post => post._id.toString() === id2);

        const [object] = PostUser;
        return response.status(200).render('view-post/view-post',{
            title: object.title,
            object,
            username: Postagem.username,
            id,
            id2,
            PORT: process.env.PORT,
            cssFiles: [
                `http://localhost:8080/css/header.css`,
                `http://localhost:8080/css/post/view-post.css`,
                `http://localhost:8080/css/index.css`
            ],
            jsFiles: [`http://localhost:8080/js/index.js`,'http://localhost:8080/js/view-post.js'],
            img: "http://localhost:8080/imgs/node.png"
        });
    },
    async Notification (request,response) {
        const {username} = request.user;
        const Notification = await NotificationModel.findOne({username});
        return response.status(200).json({notification: Notification.notification.length});
    },
    async ViewNotification (request,response) {
        const {username} = request.user;
        const User = await NotificationModel.findOne({username});
        return response.status(200).render('view-notification',{
            title: "Notificações",
            notifications: User.notification,
            lenghtNotificaton: User.notification.length,
            cssFiles: ["http://localhost:8080/css/header.css","http://localhost:8080/css/index.css",'http://localhost:8080/css/notification.css'],
            jsFiles: ["http://localhost:8080/js/index.js",'http://localhost:8080/js/view-notification.js'],
            img: "http://localhost:8080/imgs/node.png"
        });
    },
    async ViewProfileUser (request,response) {
        const idParam = request.params.id;
        if (!mongoose.Types.ObjectId.isValid(idParam)) {
            return response.status(404).redirect('/404');
        };
        const PostUser = await PostModel.findById(idParam);
        const User = await UserModel.findOne({username: PostUser.username});
        console.log(PostUser)
        return response.status(200).render('view-user/view-user',{
            title: PostUser.username,
            cssFiles: [
                "http://localhost:8080/css/header.css",
                "http://localhost:8080/css/index.css",
                'http://localhost:8080/css/view-user/view-user.css'
            ],
            username: PostUser.username,
            biografy: User.biografy,
            PostUser,
            jsFiles: ["http://localhost:8080/js/index.js","http://localhost:8080/js/view-profile-user.js"],
            img: "http://localhost:8080/imgs/node.png"
        });
    },
    async GetUsername (request,response) {
        const username = request.params.username;
        const User = await UserModel.findOne({username});
        const PostUser = await PostModel.findOne({username});
        if (!PostUser) {
            return response.status(200).render('view-user/user-not-post',{
                title: username,
                username,
                biografy: User.biografy,
                PostUser,
                cssFiles: [
                "http://localhost:8080/css/header.css",
                "http://localhost:8080/css/index.css",
                'http://localhost:8080/css/view-user/view-user.css'
            ],
                jsFiles: [
                "http://localhost:8080/js/index.js",
                "http://localhost:8080/js/view-profile-user.js"
            ],
                img: "http://localhost:8080/imgs/node.png"
            });
        };
        return response.redirect(`/${PostUser._id.toString()}`);
    },
    async EditProfile (request,response) {
        const {username,id} = request.user;
        const UserId = await RegisterModel.findById(id);
        const User = await UserModel.findOne({id:UserId._id.toString()});
        return response.status(200).render('edit-profile/edit-profile',{
            title: 'Perfil',
            username:User.username,
            biografy: User.biografy,
            cssFiles: [
            "http://localhost:8080/css/header.css",
            "http://localhost:8080/css/index.css",
            "http://localhost:8080/css/edit-profile/edit-profile.css"],
            jsFiles: ["http://localhost:8080/js/index.js",'http://localhost:8080/js/edit-profile.js'],
            img: 'http://localhost:8080/imgs/node.png'
        });
    },
    async MyPost (request,response) {
        const {username} = request.user;
        const PostUser = await PostModel.findOne({username});
        console.log(PostUser)
        return response.status(200).render('my-posts/my-posts',{
            title: 'Minhas Postagens',
            cssFiles: ["css/header.css","css/index.css",'css/my-post/my-post.css'],
            jsFiles: ["js/index.js"],
            PostUser,
            img: 'imgs/node.png'
        });
    }
};