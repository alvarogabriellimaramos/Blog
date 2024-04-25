// responsável pela crianção de postagem

const PostUser = require("../services/models/postagens");

module.exports = async function (request,response) {
    try {
        const {title,text} = request.body;
        const {username} = request.user;
        const Username = await PostUser.findOne({username});
        if (!title) {
            return response.status(401).json({messagem: 'O titulo é obrigatório'});
        }
        if (!text) {
            return response.status(401).json({messagem: 'Escreva algo no corpo da publicação'});
        };
        if (Username === null) {
            await PostUser.create({
                username,
                photo: '',
                Posts: [{title:title,text:text}]
            });
            return response.status(200).redirect('/');
        };
        Username.Posts.push({
            title:title,
            text:text
        });
        await Username.save();
        return response.status(200).redirect('/');
    }
    catch (e) {
        console.log(e)
    };
};