//responsável por todos os controllers GET
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const PostModel = require("../services/models/postagens");
const NotificationModel = require("../services/models/notification");
const UserModel = require('../services/models/profile');
const RegisterModel = require("../services/models/registros");

module.exports = {
    async Home (request,response) {
        const users = await PostModel.find();
        const SortedPost = users.flatMap(user => {
            return user.Posts.map(post => {
                return {
                    username: user.username,
                    _id: user._id,
                    postId: post._id,
                    title: post.title,
                    date: post.date,
                    comments: post.comments
                }
            })
        }).sort((a,b) => b.date - a.date);
        return response.render('home',{
            cssFiles: ["css/header.css","css/main.css",'css/index.css'],
            jsFiles: ["js/index.js",'js/search.js'],
            title: "Home",
            PORT: process.env.PORT,
            SortedPost,
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
    Info (request,response) {
        return response.status(200).render('info/info',{
            title: 'Sobre o projeto',
            cssFiles: ["http://localhost:8080/css/index.css","http://localhost:8080/css/header.css","http://localhost:8080/css/info/info.css"],
            img: 'http://localhost:8080/imgs/node.png',
            jsFiles: ["http://localhost:8080/js/index.js"]
        });
    }
    ,
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

        const PostUser = Postagem.Posts.filter(post => post._id.toString() === id2);

        const [object] = PostUser;
        if (!Postagem || !object) {
            return response.status(404).redirect("/404")
        }
        object.comments.sort((a, b) => new Date(b.date) - new Date(a.date)).map(comment => {
            return {
                ...comment,
                response: comment.response.sort((a, b) => new Date(b.date) - new Date(a.date))
            }
        });
        
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
        return response.status(200).render('my-posts/my-posts',{
            title: 'Minhas Postagens',
            cssFiles: ["css/header.css","css/index.css",'css/my-post/my-post.css'],
            jsFiles: ["js/index.js","js/my-post.js"],
            PostUser,
            img: 'imgs/node.png'
        });
    },
    async Programmer (request,response) {
        const Posts = await PostModel.find();
        const Programmer = Posts.flatMap(user => {
            return user.Posts.map(post => {
                return {
                    id: user._id,
                    title: post.title,
                    date: post.date,
                    username: user.username,
                    postId: post._id,
                    comments: post.comments,
                    category: post.category
                }
            });
        }).filter(post => post.category === 'programação')
        return response.status(200).render('category/programmer',{
            title: 'Programação',
            cssFiles: [
                "http://localhost:8080/css/index.css",
                "http://localhost:8080/css/header.css",
                "http://localhost:8080/css/category.css"
            ],
            jsFiles: ["http://localhost:8080/js/index.js"],
            
            img: 'http://localhost:8080/imgs/node.png',
            Programmer
        })
    }
};