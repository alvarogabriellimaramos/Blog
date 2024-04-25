const mongoose = require('mongoose');

const USER = process.env.USER;
const PASS = process.env.PASS;

module.exports = function (callback) {
    if (USER === undefined || PASS === undefined) {
        console.log('Suas crendenciais estão inválidas');
        return;
    };
    mongoose.connect(`mongodb+srv://${USER}:${PASS}@teste.q0unlks.mongodb.net/`).then(() => {
        callback();
        console.log('Conectado ao banco de dados com sucesso');
    }).catch(e => console.log(`Erro ao se conecta com o banco de dados ${e}`));
};
