const mongoose = require("mongoose");
// modulo responsável pela crianção de comentários e crianção das respostas nos comentários

const PostUser = require("../services/models/postagens");
const User = require('../services/models/notification');
async function Comments(request, response) {
    try {
        const user = request.query.user;

        const post = request.query.post;
        
        const { comment } = request.body;
        const Username = await PostUser.findOne({ username: request.user.username });
  
        if (!comment) {
            return response.status(400).json({ messagem: 'Escreva algo no comentário' });
        };


        const UserView = await PostUser.findById(user);
        const Notification = await User.findOne({ username: UserView.username });
        const Postagem = UserView.Posts.filter(posts => posts._id.toString() === post);
        const [object] = Postagem;
        if (!Username) {
            object.comments.push({
                username: request.user.username,
                comment: comment
            });
            Notification.notification.push({
                messagem: `
                <div>
                    <p> <strong> ${request.user.username} </strong> comentou na sua publicação. <a href='/${UserView._id}/${post}'> Link da publicação </a>
                </div>
            `
            });
            Promise.all([ await UserView.save(),await Notification.save()])
            return response.status(200).json({messagem: 'Comentário criado com sucesso'})
        }
        object.comments.push({
            username: request.user.username,
            comment: comment
        });
       
        Promise.all([ await UserView.save(),await Notification.save()])
        return response.status(200).json({ messagem: 'Comentário criado com sucesso' });
    }
    catch (e) {
        console.log(e);
    }
};
async function ResponseComment(request, response) {
    try {
        const { response__comment, index } = request.body
        if (!response__comment) {
            return response.status(400).json({ messagem: 'Digite algo para responder' });
        };
        const user = request.query.user;
        const post = request.query.post;
        const Post = await PostUser.findById(user);
        const Postagem = Post.Posts.filter(posts => posts._id.toString() === post);
        const Username = await PostUser.findOne({ username: request.user.username });
        
        const [comment] = Postagem;
        const Notification = await User.findOne({ username: comment.comments[index].username });
        if (!Username) {
            comment.comments[index].response.push({
                username: request.user.username,
                comment:response__comment
            });
            Notification.notification.push({
                messagem: `
                    <div>
                        <p>
                            <strong>${request.user.username}</strong> respondeu ao seu comentário. <a href='/${Post._id}/${post}'>Link da publicação</a>
                        </p>
                    </div>
                `,
                date: new Date().toISOString()
            })
            Promise.all([await Post.save(),await Notification.save()]);
            return response.status(200).json('true');
        };
        comment.comments[index].response.push({
            username: request.user.username,
            comment:response__comment
        });
        Promise.all([await Post.save(),await Notification.save()]);
        return response.status(200).json('true')
    }
    catch (e) {
        console.log(e);
    };
};

module.exports = { Comments, ResponseComment };