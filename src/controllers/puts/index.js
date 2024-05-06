
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
        console.log(e);
    };
};