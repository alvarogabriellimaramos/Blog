//responsável por todos os controllers GET

const mongoose = require('mongoose');
const PostModel = require("../services/models/postagens");
const UserModel = require("../services/models/usernames");

module.exports = {
    async Home (request,response) {
        const PostsAll = await PostModel.find();
        console.log(process.env.PORT)
        return response.render('home',{
            cssFiles: ["css/header.css","css/main.css",'css/index.css'],
            jsFiles: ["js/index.js"],
            title: "Home",
            PORT: process.env.PORT,
            PostsAll
        });
    },
    Login (request,response) {
        return response.status(200).render('login/login',{
            title: "Login Page",
            cssFiles: ['css/forms/form.css','css/index.css'],
            jsFiles: ["js/login.js"]
        })
    },
    Register (request,response) {
        return response.status(200).render('register/register',{
            title: 'Register Page',
            cssFiles: ["css/index.css","css/forms/form.css"],
            jsFiles: ['js/register.js']
        })
    } ,
    CreatePost(request,response,next) {
        return response.status(200).render('create-post',{
            title: 'Criar nova postagem',
            cssFiles: ["css/header.css",'css/post/create-post.css','css/index.css'],
            jsFiles: ["js/index.js",'js/create-post.js'],
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
            return response.status(301).redirect('/');
        };
        const Postagem = await PostModel.findById(id);

        const PostUser = Postagem.Posts.filter(post => post._id.toString() === id2);

        const [object] = PostUser;
        
        return response.status(200).render('view-post/view-post',{
            title: object.title,
            object,
            username: Postagem.username,
            PORT: process.env.PORT,
            cssFiles: [
                `http://localhost:8080/css/header.css`,
                `http://localhost:8080/css/post/view-post.css`,
                `http://localhost:8080/css/index.css`
            ],
            jsFiles: [`http://localhost:8080/js/index.js`],
        });
    },
    async Notification (request,response) {
        const {username} = request.user;
        const User = await UserModel.findOne({username});
        return response.status(200).json({notifications: User.notification});
    }
};