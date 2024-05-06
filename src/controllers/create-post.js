// responsável pela crianção de postagem
const PostUser = require("../services/models/postagens");
const RegisterModel = require('../services/models/registros');

module.exports = async function (request,response) {
    try {
        const {title,body} = request.body;
        const {username} = request.user;
        const Username = await PostUser.findOne({username});
        const User = await RegisterModel.findOne({username});
        console.log(User)
        if (!title) {
            return response.status(401).json({messagem: 'O titulo é obrigatório'});
        }
        if (!body) {
            return response.status(401).json({messagem: 'Escreva algo no corpo da publicação'});
        };
        if (Username === null) {
            await PostUser.create({
                username,
                photo: '',
                
                Posts: [{title:title,body:body}]
            });
            return response.status(200).redirect('/');
        };
        Username.Posts.push({
            title:title,
            body:body
        });
        await Username.save();
        return response.status(200).redirect('/');
    }
    catch (e) {
        console.log(e)
    };
};