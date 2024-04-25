const RegisterModel = require("../../services/models/registros.js");
const UserModel = require("../../services/models/usernames.js");
const JWT = require("../../utils/jwt.js");
const SendEmail = require('../../services/email/index.js');
const Invalid = require('../../services/models/tokensInvalid.js');

async function SendToken(request,response) {
    try {
        const {username,email,password,confirmPass} = request.body;
        const Username = await RegisterModel.findOne({username});
        const Email = await RegisterModel.findOne({email});
        if (!username || Username !== null || username.length < 4) {
            return response.status(400).json({messagem: 'Esse usuario é invalido ou já existe'})
        };
        if (!email || Email !== null) {
            return response.status(400).json({messagem: 'Esse email é invalido ou já existe'});
        };
        if (password.length < 8) {
            return response.status(400).json({messagem: 'Sua senha precisa ter no minimo oito caracteres'});
        };
        if (confirmPass !== password) {
            return response.status(400).json({messagem: 'Suas senhas não batem'});
        };
        const ConfigUser = {username,email,password};
        const token = await JWT(ConfigUser);
        return response.status(200).json(await SendEmail(email,token,'createuser'));
    }
    catch (e) {
        console.log(e);
        return response.status(500).render('err/500',{
            title: 'Err Server',
            jsFiles: ["js/index.js"]
        });
    };
};
async function Register (request,response) {
    try {
        const {username,email,password} = request.user;
        const {token} = request.token;
        const TokenInvalid = await Invalid.findOne({token});
        if (TokenInvalid !== null) {
            return response.status(401).json({messagem: 'Token já utilizado'})
        };
        await RegisterModel.create({username,email,password});
        await UserModel.create({username,notification: [{messagem: ` Meus parabéns ${username},sua conta foi criada com sucesso,qualquer dúvida sobre o site,você pode acessar "sobre o projeto" no menu da home :D `}]});
        
        return response.status(201).redirect('/login');
    }
    catch (e) {
        console.log(e);
        return response.status(500).render('err/500',{
            title: 'Err Server',
            jsFiles: ["js/index.js"]
        });
    };
};

module.exports = {
    SendToken,
    Register
};