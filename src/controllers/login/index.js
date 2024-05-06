//responsável por valida o login do usuario

const ModelRegister = require('../../services/models/registros');
const ProfileModel = require('../../services/models/profile.js');

const {Compare} = require('../../utils/hash');
const JWT = require('../../utils/jwt');

module.exports = async function (request,response) {
    const {username,password} = request.body;
    const Username = await ModelRegister.findOne({username});
    const Profile = await ProfileModel.findOne({username});
    if (!username || Username === null) {
        return response.status(401).json({messagem: 'Esse usuario não existe'});
    };
    const result = await Compare(password,Username.password);
    
    if (result) {
        Profile.id = Username._id.toString();
        const Config = {
            username,
            email: 'email indefinido',
            id: Username._id.toString(),
            password: Username.password
        };
        const token = await JWT(Config);
        await Profile.save();
        return response.status(200).json({token});
    };
    if (!result) {
        return response.status(401).json({messagem: 'Senha incorreta'});
    };
};