const jwt = require("jsonwebtoken");
const {Hash} = require('./hash.js')

async function CreateToken (user) {
    const configUser = {
        username: user.username,
        email: user.email,
        password: await Hash(user.password)
    }
    const SECRET = process.env.SECRET;
    const JWT = jwt.sign(configUser,SECRET)
    return JWT;
}

module.exports = CreateToken;