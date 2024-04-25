//responsável por valida o login do usuario

const ModelRegister = require('../../services/models/registros');
const {Compare} = require('../../utils/hash');
const JWT = require('../../utils/jwt');

module.exports = async function (request,response) {
    const {username,password} = request.body;
    const Username = await ModelRegister.findOne({username});
    if (!username || Username === null) {
        return response.status(401).json({messagem: 'Esse usuario não existe'});
    };
    const result = await Compare(password,Username.password);
    if (result) {
        const Config = {
            username,
            email: 'email indefinido',
            password: Username.password
        };
        const token = await JWT(Config);
        return response.status(200).json({token});
    };
    if (!result) {
        return response.status(401).json({messagem: 'Senha incorreta'});
    };
};