// controllers responsável por fazer o logout do usuario

const Invalid = require('../../services/models/tokensInvalid.js');

module.exports = async (request,response) => {
    try {
        const token = request.token;
        const Token = await Invalid.findOne({token});
        await Invalid.create({token});
        return response.status(200).json({logout: true});
    }
    catch (e) {
        console.log(e) ;
        return response.status(500).render('err/500',{
            title: "Err server",
            img: "http://localhost:8080/imgs/node.png",
            jsFiles: ["http://localhost:8080/js/index.js"],
            cssFiles: ["http://localhost:8080/css/header.css",'http://localhost:8080/css/index.css']
        })
    }
};