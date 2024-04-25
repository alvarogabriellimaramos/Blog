const jwt = require('jsonwebtoken');

const Invalid = require('../../services/models/tokensInvalid');

module.exports = async function (request,response,next) {
    const token = request.header('Authorization') || request.query.token;
    const TokenInvalid = await Invalid.findOne({token});
    if (!token || TokenInvalid !== null) {
        return response.status(401).json({messagem: 'Token Invalidoo'});
    };
    jwt.verify(token,process.env.SECRET,function (err,user) {
        if (err) {
            return response.status(401).json({messagem: 'Token Inválido'})
        };
        request.user = user;
        request.token = token;
        next();
    });
};