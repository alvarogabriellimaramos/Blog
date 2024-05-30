const mongoose = require("mongoose");
// modulo responsável pela crianção de comentários e crianção das respostas nos comentários

const PostUser = require("../services/models/postagens");
const UserModel = require('../services/models/notification');
async function Comments(request, response) {
    try {
        const { comment} = request.body;
        const Username = await PostUser.findOne({ username: request.user.username });
  
        if (!comment) {
            return response.status(400).json({ messagem: 'Escreva algo no comentário' });
        };

        const UserView = await PostUser.findById(request.query.user);
        const Notification = await UserModel.findOne({ username: UserView.username });
        
        const Postagem = UserView.Posts.filter(posts => posts._id.toString() === request.query.post);
        const [object] = Postagem;

        if (UserView.username !== Username.username) {
            object.comments.push({
                username: request.user.username,
                comment: comment,
                date: new Date()
            });

            Notification.notification.push({
                messagem: `
                <div>
                    <p> <strong> ${request.user.username} </strong> comentou na sua publicação. <a href='/view-post/${UserView._id}/${request.query.post}'> Link da publicação </a>
                </div>
            `});

            Promise.all([await UserView.save(),await Notification.save()]);
            return response.status(200).json({ messagem: 'Comentário criado com sucesso' });
        };

        object.comments.push({
            username: request.user.username,
            comment: comment,
            date: new Date()
        });

        await UserView.save();
        return response.status(200).json({ messagem: 'Comentário criado com sucesso' });
    }
    catch (e) {
        return response.status(500).render('err/500',{
            title: "Err server",
            img: "http://localhost:8080/imgs/node.png",
            jsFiles: ["http://localhost:8080/js/index.js"],
            cssFiles: ["http://localhost:8080/css/header.css",'http://localhost:8080/css/index.css']
        })
    };
};
async function ResponseComment(request, response) {
    try {
        const { response__comment, commentId } = request.body
        if (!response__comment) {
            return response.status(400).json({messagem: 'Você precisa escreve algo'})
        }
        const User = await PostUser.findById(request.query.user);
        const Username = await PostUser.findOne({ username: request.user.username });

        const Postagem = User.Posts.find(post => post._id.toString() === request.query.post);
        const comment = Postagem.comments.find(comment => comment._id.toString() === commentId);

        const Notification = await UserModel.findOne({ username: comment.username});

        if (Username.username !== User.username) {
            comment.response.push({
                username: request.user.username,
                comment: response__comment
            })
            Notification.notification.push({
                messagem: `
                <div>
                <p> <strong> ${request.user.username} </strong> respondeu seu comentário. <a href='/view-post/${User._id}/${request.query.post}'> Link da publicação </a>
            </div>
                `
            })
            Promise.all([await User.save(),await Notification.save()]);
            return response.status(200).json('true')
        };

        comment.response.push({
            username: request.user.username,
            comment: response__comment
        });
        await User.save();
        return response.status(200).json('true')
    }
    catch (e) {
        return response.status(500).render('err/500',{
            title: "Err server",
            img: "http://localhost:8080/imgs/node.png",
            jsFiles: ["http://localhost:8080/js/index.js"],
            cssFiles: ["http://localhost:8080/css/header.css",'http://localhost:8080/css/index.css']
        });
    };
};

module.exports = { Comments, ResponseComment };