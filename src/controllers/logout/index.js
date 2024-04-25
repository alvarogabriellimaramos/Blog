// controllers responsável por fazer o logout do usuario

const Invalid = require('../../services/models/tokensInvalid.js');

module.exports = async (request,response) => {
    const token = request.token;
    const Token = await Invalid.findOne({token});
    await Invalid.create({token});
    return response.status(200).json({logout: true});
};