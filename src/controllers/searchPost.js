// controller responsável pelas pesquisa do usuario 

const PostModel = require("../services/models/postagens");
module.exports = async function (request,response) {
    try {
        const search = request.body.search;
        const PostsUser = await PostModel.find();
        const PostSearch = PostsUser.flatMap(user => {
            return user.Posts.map(post => {
                return {
                    id:user._id,
                    date: post.date,
                    username:user.username,
                    postId:post._id,
                    title:post.title,
                    comments: post.comments
                }
            });
        }).filter(post => post.title === search);
        if (PostSearch.length === 0) {
            return response.status(404).json({messagem: 'Postagem não encontrada'});
        };
        return response.status(200).json(PostSearch)
    }
    catch (e) {
        return response.status(200).render('err/500',{
            title: 'Err Internal',
            img: "http://localhost:8080/imgs/node.png",
            cssFiles: ["http://localhost:8080/css/index.css","http://localhost:8080/css/header.css"],
            jsFiles: ["http://localhost:8080/js/index.js"]
        })
    }
}