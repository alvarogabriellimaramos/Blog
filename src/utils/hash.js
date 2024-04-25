const bcrypt = require('bcrypt');

async function Hash (password) {
    const hash = await bcrypt.hash(password,10);
    return hash;
}

async function Compare (password,hash) {
    const result = await bcrypt.compare(password,hash);
    return result;
};

module.exports = {
    Hash,Compare
}