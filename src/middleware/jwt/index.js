const jwt = require('jsonwebtoken');

const Invalid = require('../../services/models/tokensInvalid');

module.exports = async function (request,response,next) {
    const token = request.header('Authorization') || request.query.token;
    const TokenInvalid = await Invalid.findOne({token});
    if (!token || TokenInvalid !== null) {
        return response.status(401).json({messagem: 'Você precisa está logado'});
    };
    jwt.verify(token,process.env.SECRET,function (err,user) {
        if (err) {
            return response.status(401).json({messagem: 'Você precisa está logado'})
        };
        request.user = user;
        request.token = token;
        next();
    });
};