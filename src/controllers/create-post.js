// responsável pela crianção de postagem
const PostUser = require("../services/models/postagens");
const RegisterModel = require('../services/models/registros');

module.exports = async function (request,response) {
    try {
        const {title,body,category} = request.body;
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
                
                Posts: [{title:title,category:category,body:body}]
            });
            return response.status(200).redirect('/');
        };
        Username.Posts.push({
            title:title,
            category:category,
            body:body
        });
        await Username.save();
        return response.status(200).redirect('/');
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