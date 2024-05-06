require('dotenv').config();
const nodemailer = require('nodemailer');
const html = require("./html.js")

const EMAIL = 'alvarogabriel1103@hotmail.com';
const PASSWORD = 'alalal##';

module.exports = function (email,token,router) {
    const transport = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Token de verificação',
        html: html(token,router)
    };
    return new Promise((resolve,reject) => {
        transport.sendMail(mailOptions,function(error) {
            if (error) {
                console.log(error);
                reject({messagem: 'Erro ao envia email,tente novamente mais tarde.'});
            }
            resolve({messagem: 'Enviamos um token de verificação para o seu e-mail'})
        })
    })
}