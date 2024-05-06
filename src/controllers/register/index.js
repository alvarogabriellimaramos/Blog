const validator = require("validator");

const RegisterModel = require("../../services/models/registros.js");
const NotificationModel = require("../../services/models/notification.js");
const ProfileModel = require('../../services/models/profile.js')
const JWT = require("../../utils/jwt.js");
const SendEmail = require('../../services/email/index.js');
const Invalid = require('../../services/models/tokensInvalid.js');

async function SendToken(request,response) {
    try {
        const {username,email,password,confirmPass} = request.body;
        const existingUser = await RegisterModel.findOne({$or: [{username}, {email}]});
        if (!username || username.length < 4) {
            return response.status(400).json({messagem: 'O nome de usuário é inválido ou muito curto'})
        };
        if (!email || !validator.isEmail(email)) {
            return response.status(400).json({messagem: 'O email é inválido'});
        };
        if (password.length < 8) {
            return response.status(400).json({messagem: 'Sua senha precisa ter no minimo oito caracteres'});
        };
        if (confirmPass !== password) {
            return response.status(400).json({messagem: 'Suas senhas não batem'});
        };
        if (existingUser) {
            if (existingUser.username === username) {
                return response.status(400).json({messagem: 'Esse usuario já existe'});
            };
            if (existingUser.email === email ){
                return response.status(400).json({messagem: 'Esse email já está cadastrado'});
            };
        };
        const ConfigUser = {username,email,password};
        const token = await JWT(ConfigUser);
        return response.status(200).json(await SendEmail(email, token, 'createuser'));
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
        const Username = await RegisterModel.findOne({username})
        const Email = await RegisterModel.findOne({email});
        const token = request.token;
        const TokenInvalid = await Invalid.findOne({token});
        if (TokenInvalid !== null) {
            return response.status(401).json({messagem: 'Token já utilizado'})
        };
        if (Username || Email) {
            return response.status(400).json({messagem: 'Esse usuario já existe'});
        };

        await RegisterModel.create({username,email,password});
        await NotificationModel.create({username,notification: [{messagem: ` 
        <strong> Meus parabéns ${username} </strong>,sua conta foi criada com sucesso,qualquer dúvida sobre o site você poderá acessar <strong>"sobre o projeto"</strong> no menu da home :D `}]});
        await Invalid.create({token});
        await ProfileModel.create({username});
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