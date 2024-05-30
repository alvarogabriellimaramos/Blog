
const UserModel = require('../../services/models/profile');
module.exports = async function (request,response) {
    try {
        const {username,id} = request.user;
        const {user,body} = request.body;
        const User = await UserModel.findOne({username});
        User.biografy = body;
        await User.save();
        return response.status(200).json({messagem: 'Perfil atualizado com sucesso'})
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