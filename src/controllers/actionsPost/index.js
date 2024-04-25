const PostUser = require("../../services/models/postagens");

module.exports = {
    async Bold (request,response) {
        const {body} = request.body;
        const HTML = `<div><b>${body}</b></div>`
        return response.status(200).json({HTML});
    }
};